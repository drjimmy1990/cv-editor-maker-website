# Payment Gateway n8n Workflow Guide

This guide details the secure implementation of payment workflows using n8n. We use n8n as a secure backend to handle EdfaPay interactions, protecting API keys and ensuring data integrity.

## Prerequisites: EdfaPay Dashboard Setup

Before setting up n8n, you must configure your EdfaPay Merchant Dashboard:

1.  **Register/Login:** Go to [EdfaPay Merchant Dashboard](https://dashboard.edfapay.com/).
2.  **Get Credentials:**
    *   Navigate to **Settings** > **API Keys** (or Integration).
    *   Copy your **Merchant Key**.
    *   Copy your **Merchant Password**.
    *   **CRITICAL:** These credentials should **NEVER** be put in the frontend code or `.env.local` of the website. They will be used exclusively in n8n.
3.  **Set Webhook/Callback URL:**
    *   Wait until you deploy your n8n workflow.
    *   Once deployed, get the Production URL for the `payment-callback` webhook (e.g., `https://n8n.ai4eg.com/webhook/payment-callback`).
    *   In EdfaPay Dashboard, go to **Settings** > **Callback Configuration**.
    *   Paste the n8n webhook URL there.

---

## Workflow 1: Initiate Payment (`initiate-payment`)

**Trigger:** Webhook (POST) `/webhook/initiate-payment`

### Payload Schema
```json
{
  "userId": "uuid-string",
  "packageId": "string (e.g., 'basic', 'pro')",
  "promoCode": "string (optional)",
  "type": "string (default: 'credits_purchase')"
}
```

### Steps logic:

1.  **Get Package Price (Security Critical)**
    *   **Action:** Query Supabase `system_config` table.
    *   **Logic:** Fetch the price for the requested `packageId`. Do NOT trust any price sent from the frontend.
    *   **Config Key Convention:** Ensure you have keys in `system_config` like `price_basic`, `price_pro`, `price_premium`.
    *   **Query:** `SELECT value FROM system_config WHERE key = 'price_{{$json.packageId}}'`

2.  **Validate Promo Code (If present)**
    *   **Action:** Call Supabase RPC `validate_promo_code`.
    *   **Goal:** Calculate final amount server-side.
    *   **Logic:**
        *   If `promoCode` is provided, call `validate_promo_code`.
        *   **Node Configuration:**
            *   **Operation:** Call a Postgres Function
            *   **Function Name:** `validate_promo_code`
            *   **Parameters (JSON):**
                ```json
                {
                  "code_input": "{{ $json.promoCode }}",
                  "cart_amount": "{{ $node['Get Package Price'].json.value }}"
                }
                ```
            *   **Alternative (HTTP Request):**
                *   **Method:** POST
                *   **URL:** `<your-supreme-url>/rest/v1/rpc/validate_promo_code`
                *   **Headers:**
                    *   `apikey`: `<your-service-role-key-or-anon-key>`
                    *   `Authorization`: `Bearer <your-key>`
                    *   `Content-Type`: `application/json`
                *   **Body:** Same JSON as above.
        *   Use the returned `final_price` as the transaction amount.
        *   If no promo code, use the package price.

3.  **Create Transaction Record (Pending)**
    *   **Action:** Insert into Supabase `transactions` table.
    *   **Status:** `pending`
    *   **Fields:** `user_id`, `amount_original`, `amount_final`, `type`, `status='pending'`.
    *   **promo_code_id:** Map this from the output of the **Validate Promo Code** step. The RPC function returns `promo_id`.
        *   Expression: `{{ $json.promo_id }}` (if coming directly from previous node) or `{{ $node["Validate Promo"].json.promo_id }}`.

4.  **Generate Security Hash (Pure JS Code)**
    *   **Reason:** Your n8n blocks `require('crypto')` and is missing SHA1 in the UI. We will use a "Code" node with pure algorithms.
    *   **Action:** Add a **Code** Node (JavaScript).
    *   **Code:** Paste this *exact* complete script:
    
    ```javascript
    // --- Helper: Pure JS MD5 Implementation ---
    function md5(string) {
        function RotateLeft(lValue, iShiftBits) {
            return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
        }
        function AddUnsigned(lX, lY) {
            var lX4, lY4, lX8, lY8, lResult;
            lX8 = (lX & 0x80000000); lY8 = (lY & 0x80000000);
            lX4 = (lX & 0x40000000); lY4 = (lY & 0x40000000);
            lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
            if (lX4 & lY4) return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
            if (lX4 | lY4) {
                if (lResult & 0x40000000) return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
                else return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
            } else return (lResult ^ lX8 ^ lY8);
        }
        function F(x, y, z) { return (x & y) | ((~x) & z); }
        function G(x, y, z) { return (x & z) | (y & (~z)); }
        function H(x, y, z) { return (x ^ y ^ z); }
        function I(x, y, z) { return (y ^ (x | (~z))); }
        function FF(a, b, c, d, x, s, ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
        }
        function GG(a, b, c, d, x, s, ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
        }
        function HH(a, b, c, d, x, s, ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
        }
        function II(a, b, c, d, x, s, ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
        }
        function ConvertToWordArray(string) {
            var lWordCount;
            var lMessageLength = string.length;
            var lNumberOfWords_temp1 = lMessageLength + 8;
            var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
            var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
            var lWordArray = Array(lNumberOfWords - 1);
            var lBytePosition = 0;
            var lByteCount = 0;
            while (lByteCount < lMessageLength) {
                lWordCount = (lByteCount - (lByteCount % 4)) / 4;
                lBytePosition = (lByteCount % 4) * 8;
                lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
                lByteCount++;
            }
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
            lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
            lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
            return lWordArray;
        }
        function WordToHex(lValue) {
            var WordToHexValue = "", WordToHexValue_temp = "", lByte, lCount;
            for (lCount = 0; lCount <= 3; lCount++) {
                lByte = (lValue >>> (lCount * 8)) & 255;
                WordToHexValue_temp = "0" + lByte.toString(16);
                WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
            }
            return WordToHexValue;
        }
        var x = ConvertToWordArray(string);
        var k, AA, BB, CC, DD, a, b, c, d;
        var S11 = 7, S12 = 12, S13 = 17, S14 = 22;
        var S21 = 5, S22 = 9, S23 = 14, S24 = 20;
        var S31 = 4, S32 = 11, S33 = 16, S34 = 23;
        var S41 = 6, S42 = 10, S43 = 15, S44 = 21;
        a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
        for (k = 0; k < x.length; k += 16) {
            AA = a; BB = b; CC = c; DD = d;
            a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
            d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
            c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
            b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
            a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
            d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
            c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
            b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
            a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
            d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
            c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
            b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
            a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
            d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
            c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
            b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
            a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
            d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
            c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
            b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
            a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
            d = GG(d, a, b, c, x[k + 10], S22, 0x02441453);
            c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
            b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
            a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
            d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
            c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
            b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
            a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
            d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
            c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
            b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
            a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
            d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
            c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
            b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
            a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
            d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
            c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
            b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
            a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
            d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
            c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
            b = HH(b, c, d, a, x[k + 6], S34, 0x04881D05);
            a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
            d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
            c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
            b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
            a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
            d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
            c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
            b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
            a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
            d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
            c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
            b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
            a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
            d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
            c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
            b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
            a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
            d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
            c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
            b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
            a = AddUnsigned(a, AA);
            b = AddUnsigned(b, BB);
            c = AddUnsigned(c, CC);
            d = AddUnsigned(d, DD);
        }
        return (WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d)).toLowerCase();
    }

    // --- Helper: Pure JS SHA1 Implementation ---
    function sha1(str) {
      var rotateLeft = function(lValue, iShiftBits) {
        return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
      };
      var cvt_hex = function(val) {
        var str = "";
        var i;
        var v;
        for (i = 7; i >= 0; i--) {
          v = (val >>> (i * 4)) & 0x0f;
          str += v.toString(16);
        }
        return str;
      };
      
      var block = ((str.length + 8) >> 6) + 1;
      var blks = Array(block * 16);
      var i;

      for (i = 0; i < block * 16; i++) blks[i] = 0;
      for (i = 0; i < str.length; i++)
        blks[i >> 2] |= str.charCodeAt(i) << (24 - (i % 4) * 8);
      
      blks[i >> 2] |= 0x80 << (24 - (i % 4) * 8);
      blks[block * 16 - 1] = str.length * 8;

      var w = Array(80);
      var a = 1732584193;
      var b = -271733879;
      var c = -1732584194;
      var d = 271733878;
      var e = -1009589776;

      for (i = 0; i < blks.length; i += 16) {
        var olda = a;
        var oldb = b;
        var oldc = c;
        var oldd = d;
        var olde = e;

        for (var j = 0; j < 80; j++) {
          if (j < 16) w[j] = blks[i + j];
          else w[j] = rotateLeft(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
          var t = rotateLeft(a, 5) + e + w[j] +
            ((j < 20) ? ((b & c) | ((~b) & d)) + 1518500249 :
            (j < 40) ? (b ^ c ^ d) + 1859775393 :
            (j < 60) ? ((b & c) | (b & d) | (c & d)) - 1894007588 :
            (b ^ c ^ d) - 899497514);
          e = d;
          d = c;
          c = rotateLeft(b, 30);
          b = a;
          a = t;
        }
        a = (a + olda) >>> 0;
        b = (b + oldb) >>> 0;
        c = (c + oldc) >>> 0;
        d = (d + oldd) >>> 0;
        e = (e + olde) >>> 0;
      }
      return cvt_hex(a) + cvt_hex(b) + cvt_hex(c) + cvt_hex(d) + cvt_hex(e);
    }

    // --- MAIN LOGIC ---
    // 1. Get raw input
    const orderId = $json.transaction_id.toString();
    const amount = parseFloat($json.final_amount).toFixed(2); // FORCE "40.00" format
    const currency = "SAR";
    const desc = ("Credits Purchase: " + $json.packageId).toString();
    const password = $env.EDFAPAY_PASSWORD.toString();

    // 2. Hash Formula: SHA1( MD5( UPPER( ... ) ) )
    const rawString = (orderId + amount + currency + desc + password).toUpperCase();
    
    // 3. Perform Hashing using Pure JS functions
    const md5Hash = md5(rawString);
    const finalHash = sha1(md5Hash);

    return {
      json: {
        ...$json,
        generated_hash: finalHash, // This is your SHA1(MD5(...))
        raw_string_used: rawString // For debugging
      }
    }
    ```

5.  **Initiate EdfaPay Order**
    *   **Action:** HTTP Request (POST).
    *   **Endpoint:** `https://api.edfapay.com/payment/initiate`
    *   **Method:** POST
    *   **Body Content Type:** `Multipart-Form-Data` (Not JSON)
    *   **Body Parameters:**
        *   `action`: `SALE`
        *   `edfa_merchant_id`: `{{ $env.EDFAPAY_MERCHANT_KEY }}`
        *   `order_id`: `{{ $json.transaction_id }}`
        *   `order_amount`: `{{ $json.final_amount }}`
        *   `order_currency`: `SAR`
        *   `order_description`: `Credits Purchase: {{ $json.packageId }}`
        *   `hash`: `{{ $json.generated_hash }}` (from previous step)
        *   `payer_email`: `{{ $json.userEmail }}`
        *   `payer_first_name`: `{{ $json.userName }}`
        *   `payer_last_name`: `Customer` (Required)
        *   `payer_phone`: `966500000000` (Required - format 966...)
        *   `payer_address`: `Riyadh` (Required)
        *   `payer_country`: `SA` (Required - 2 letter code)
        *   `payer_city`: `Riyadh` (Required)
        *   `payer_zip`: `12345` (Required)
        *   `payer_ip`: `{{ $json.userIp }}` (optional)
        *   `term_url_3ds`: `https://your-site.com/payment/callback` (Redirect URL)

5.  **Return Redirect URL**
    *   **Action:** Respond to Webhook.
    *   **Body:** `{ "redirectUrl": "https://edfapay.com/checkout/..." }`

---

## Workflow 2: Payment Callback (`payment-callback`)

**Trigger:** Webhook (POST) `/webhook/payment-callback` (Called by EdfaPay)

### Steps logic:

1.  **Verify Signature (Crucial)**
    *   **Action:** Validate the incoming webhook signature from EdfaPay to ensure it's authentic.

2.  **Check Payment Status**
    *   **Logic:** If `status === 'PAID'` (or EdfaPay equivalent).

3.  **Update Transaction Status**
    *   **Action:** Update Supabase `transactions` table.
    *   **Query:** `UPDATE transactions SET status = 'paid', edfapay_transaction_id = ... WHERE id = ...`

4.  **Allocate Credits (If paid)**
    *   **Action:** Call Supabase RPC or Update `profiles` table.
    *   **Logic:**
        *   If `packageId` was 'basic', add 10 credits.
        *   If 'pro', add 30 credits.
        *   (Define these allocations in `system_config` or hardcode in workflow).
    *   **Query:** `UPDATE profiles SET credits_cv = credits_cv + X WHERE id = ...`

5.  **Send Confirmation Email**
    *   **Action:** Send email via SMTP / Gmail node.
    *   **Content:** "Thank you for your purchase..."

6.  **Handle Failure**
    *   If status is failed, update transaction status to `failed`.

---

## Required System Config Keys (Admin Panel)

Ensure the following keys exist in your `system_config` table for the pricing logic to work:

*   `price_basic` (e.g., 49)
*   `price_pro` (e.g., 99)
*   `price_premium` (e.g., 199)
*   `credits_basic` (e.g., 10)
*   `credits_pro` (e.g., 50)
*   `credits_premium` (e.g., 150)
*   `credits_business_analyzer` (e.g., 15)
*   `credits_competitor_analysis` (e.g., 20)
*   `credits_cv_creator` (e.g., 15)
*   `credits_cv_optimizer` (e.g., 10)

---

## Credits Check Pattern (For Service Workflows)

Use this pattern at the START of any service workflow (CV Optimizer, Business Analyzer, etc.) to check if the user has enough credits before proceeding.

### Flow Diagram

```
[Webhook Trigger] 
       ↓
[Supabase: Get User Credits] 
       ↓
[Supabase: Get Required Credits from system_config]
       ↓
[IF: user.credits_cv >= required?]
       ↓
   ┌───┴───┐
   ↓       ↓
 [YES]   [NO]
   ↓       ↓
[Continue] [Respond: INSUFFICIENT_CREDITS]
```

### Node-by-Node Setup

#### 1. Webhook Trigger
- **Method:** POST
- **Path:** `/webhook/cv-optimizer` (or your service endpoint)
- **Response Mode:** "Respond to Webhook"

**Expected Payload:**
```json
{
  "userId": "uuid-string",
  "file": "...",
  "...other service params"
}
```

#### 2. Supabase Node: Get User Credits
- **Operation:** Select
- **Table:** `users` (or `profiles`)
- **Filters:** 
  - `id` equals `{{ $json.userId }}`
- **Return Fields:** `credits_cv`

#### 3. Supabase Node: Get Required Credits
- **Operation:** Select
- **Table:** `system_config`
- **Filters:**
  - `key` equals `credits_cv_optimizer` (change per service)
- **Return Fields:** `value`

#### 4. IF Node: Check Sufficient Credits
- **Condition:**
  - Value 1: `{{ $node["Get User Credits"].json.credits_cv }}`
  - Operation: `Number` → `Larger or Equal`
  - Value 2: `{{ Number($node["Get Required Credits"].json.value) }}`

#### 5a. YES Branch → Continue with Service
- Connect to your actual service logic nodes
- At the end, deduct credits and respond with success

#### 5b. NO Branch → Respond to Webhook (Error)
- **Node Type:** Respond to Webhook
- **Response Body:**
```json
{
  "success": false,
  "error": "INSUFFICIENT_CREDITS",
  "currentCredits": 3,
  "requiredCredits": 10
}
```

### Frontend Handling

When your API receives the response, check for the error:

```typescript
const response = await api.callService(params);

if (response.error === 'INSUFFICIENT_CREDITS') {
  // Show InsufficientCreditsModal
  setShowCreditsModal(true);
  setCreditsInfo({
    current: response.currentCredits,
    required: response.requiredCredits
  });
  return;
}

// Continue with success handling...
```

### Service Credit Costs Reference

| Service | Config Key | Default Cost |
|---------|------------|--------------|
| CV Optimizer | `credits_cv_optimizer` | 10 |
| CV Creator | `credits_cv_creator` | 15 |
| Competitor Analysis | `credits_competitor_analysis` | 20 |
| Business Analyzer | `credits_business_analyzer` | 15 |

