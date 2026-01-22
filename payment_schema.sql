-- ==============================================================================
-- 1. System Configuration Table
-- Description: Stores dynamic system variables like pricing, API keys (public), etc.
-- ==============================================================================
CREATE TABLE IF NOT EXISTS system_config (
    key TEXT PRIMARY KEY, -- e.g., 'price_100_credits_sar', 'enable_discounts'
    value TEXT NOT NULL,
    description TEXT,
    group_name TEXT DEFAULT 'general', -- 'pricing', 'integration', 'maintenance'
    is_secret BOOLEAN DEFAULT false, -- If TRUE, blocked from public API by RLS
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone ('utc'::text, now())
);

ALTER TABLE system_config ENABLE ROW LEVEL SECURITY;

-- Policy: Admin can do everything
DROP POLICY IF EXISTS "Admins can manage config" ON system_config;

CREATE POLICY "Admins can manage config" ON system_config FOR ALL USING (
    auth.uid () IN (
        SELECT id
        FROM profiles
        WHERE
            role = 'admin'
    )
);

-- Policy: Public can READ ONLY non-secret keys
DROP POLICY IF EXISTS "Public can read non-secret config" ON system_config;

CREATE POLICY "Public can read non-secret config" ON system_config FOR
SELECT USING (is_secret = false);

-- ==============================================================================
-- 2. Promo Codes Table
-- Description: Stores discount codes and their validation rules.
-- ==============================================================================
CREATE TABLE IF NOT EXISTS promo_codes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    code TEXT UNIQUE NOT NULL, -- The code user types (e.g., 'SAVE20')
    discount_type TEXT CHECK (
        discount_type IN ('percentage', 'fixed')
    ) NOT NULL,
    discount_value DECIMAL(10, 2) NOT NULL, -- e.g., 20.00
    max_usage INTEGER, -- NULL means unlimited usage
    current_usage INTEGER DEFAULT 0,
    expires_at TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone ('utc'::text, now())
);

ALTER TABLE promo_codes ENABLE ROW LEVEL SECURITY;

-- Policy: Admin can do everything
DROP POLICY IF EXISTS "Admins can manage promos" ON promo_codes;

CREATE POLICY "Admins can manage promos" ON promo_codes FOR ALL USING (
    auth.uid () IN (
        SELECT id
        FROM profiles
        WHERE
            role = 'admin'
    )
);

-- Policy: Public CANNOT read directly (security).
-- They must use the RPC function 'validate_promo_code' to check validity.
DROP POLICY IF EXISTS "Public deny direct access" ON promo_codes;
-- No SELECT policy for public ensures RLS blocks direct reads.

-- ==============================================================================
-- 3. Transactions Table
-- Description: Tracks every payment attempt, success, and failure.
-- ==============================================================================
CREATE TABLE IF NOT EXISTS transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    user_id UUID REFERENCES profiles (id) NOT NULL,
    amount_original DECIMAL(10, 2) NOT NULL, -- Price before discount
    amount_final DECIMAL(10, 2) NOT NULL, -- Amount sent to Payment Gateway
    currency TEXT DEFAULT 'SAR',
    status TEXT DEFAULT 'pending' CHECK (
        status IN (
            'pending',
            'completed',
            'failed',
            'refunded'
        )
    ),
    type TEXT NOT NULL, -- 'credits_purchase', 'consultation_fee'
    promo_code_id UUID REFERENCES promo_codes (id),
    discount_applied DECIMAL(10, 2) DEFAULT 0,
    edfapay_order_id TEXT, -- Order ID from EdfaPay
    edfapay_transaction_id TEXT, -- Transaction ID from EdfaPay Webhook
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone ('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone ('utc'::text, now())
);

ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own transactions
DROP POLICY IF EXISTS "Users can view own transactions" ON transactions;

CREATE POLICY "Users can view own transactions" ON transactions FOR
SELECT USING (auth.uid () = user_id);

-- Policy: Admins can view all
DROP POLICY IF EXISTS "Admins can view all transactions" ON transactions;

CREATE POLICY "Admins can view all transactions" ON transactions FOR
SELECT USING (
        auth.uid () IN (
            SELECT id
            FROM profiles
            WHERE
                role = 'admin'
        )
    );

-- Policy: Insert allowed (for initial creation) - Frontend usually creates 'pending' via API or n8n
-- Ideally, n8n writes this with service_role. If Frontend initializes, allow INSERT with own user_id.
DROP POLICY IF EXISTS "Users can initiate transactions" ON transactions;

CREATE POLICY "Users can initiate transactions" ON transactions FOR INSERT
WITH
    CHECK (auth.uid () = user_id);

-- ==============================================================================
-- 4. RPC Function: Validate Promo Code
-- Description: Securely checks if a code is valid without exposing table data.
-- Usage: supabase.rpc('validate_promo_code', { code_input: 'SAVE20', cart_amount: 100 })
-- ==============================================================================
CREATE OR REPLACE FUNCTION validate_promo_code(code_input TEXT, cart_amount DECIMAL)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER -- Runs with elevated permissions to read 'promo_codes' RLS-protected table
AS $$
DECLARE
    promo RECORD;
    final_price DECIMAL;
    discount_amt DECIMAL;
BEGIN
    -- 1. Find the code
    SELECT * INTO promo
    FROM promo_codes
    WHERE LOWER(code) = LOWER(code_input)
    AND is_active = true
    LIMIT 1;

    -- 2. Basic Existence Check
    IF promo IS NULL THEN
        RETURN jsonb_build_object('valid', false, 'message', 'Invalid code');
    END IF;

    -- 3. Check Expiry
    IF promo.expires_at IS NOT NULL AND promo.expires_at < NOW() THEN
        RETURN jsonb_build_object('valid', false, 'message', 'Code expired');
    END IF;

    -- 4. Check Usage Limits
    IF promo.max_usage IS NOT NULL AND promo.current_usage >= promo.max_usage THEN
        RETURN jsonb_build_object('valid', false, 'message', 'Usage limit reached');
    END IF;

    -- 5. Calculate Discount
    IF promo.discount_type = 'percentage' THEN
        discount_amt := (cart_amount * promo.discount_value) / 100;
    ELSE -- 'fixed'
        discount_amt := promo.discount_value;
    END IF;

    -- Ensure discount doesn't exceed cart amount
    IF discount_amt > cart_amount THEN
        discount_amt := cart_amount;
    END IF;

    final_price := cart_amount - discount_amt;

    -- 6. Return Success Data
    RETURN jsonb_build_object(
        'valid', true,
        'message', 'Code applied!',
        'promo_id', promo.id,
        'discount_type', promo.discount_type,
        'discount_value', promo.discount_value,
        'discount_amount', discount_amt,
        'final_price', final_price
    );
END;
$$;