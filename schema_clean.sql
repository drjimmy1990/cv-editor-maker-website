-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================
-- 1. Profiles Table (User Management)
-- ==========================================
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    credits_cv INTEGER DEFAULT 3,
    credits_chat INTEGER DEFAULT 50,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone ('utc'::text, now()) NOT NULL
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- ==========================================
-- 2. CV Sessions Table (Individual Service)
-- ==========================================
CREATE TABLE IF NOT EXISTS cv_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    user_id UUID REFERENCES profiles (id) ON DELETE CASCADE NOT NULL,
    status TEXT DEFAULT 'active' CHECK (
        status IN (
            'active',
            'downloaded',
            'archived'
        )
    ),
    original_pdf_url TEXT,
    latest_draft_url TEXT,
    final_pdf_url TEXT,
    text_content TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone ('utc'::text, now()) NOT NULL
);

ALTER TABLE cv_sessions ENABLE ROW LEVEL SECURITY;

-- ==========================================
-- 3. Chat Messages Table (Chat History)
-- ==========================================
CREATE TABLE IF NOT EXISTS chat_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    session_id UUID REFERENCES cv_sessions (id) ON DELETE CASCADE NOT NULL,
    sender TEXT CHECK (sender IN ('user', 'ai')) NOT NULL,
    content TEXT NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT timezone ('utc'::text, now()) NOT NULL
);

ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- ==========================================
-- 4. Company Comparisons Table (Company Service)
-- ==========================================
CREATE TABLE IF NOT EXISTS company_comparisons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    user_id UUID REFERENCES profiles (id) ON DELETE CASCADE NOT NULL,
    business_link_a TEXT NOT NULL,
    business_link_b TEXT NOT NULL,
    analysis_result JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone ('utc'::text, now()) NOT NULL
);

ALTER TABLE company_comparisons ENABLE ROW LEVEL SECURITY;

-- ==========================================
-- 5. Consultation Requests Table
-- ==========================================
CREATE TABLE IF NOT EXISTS consultation_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    user_id UUID REFERENCES profiles (id) ON DELETE CASCADE NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (
        status IN (
            'pending',
            'reviewed',
            'closed'
        )
    ),
    is_paid BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone ('utc'::text, now()) NOT NULL
);

ALTER TABLE consultation_requests ENABLE ROW LEVEL SECURITY;

-- ==========================================
-- 6. Contact Submissions (Public Form)
-- ==========================================
CREATE TABLE IF NOT EXISTS contact_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone ('utc'::text, now()) NOT NULL
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- ==========================================
-- FUNCTIONS & TRIGGERS
-- ==========================================

-- Handle New User (Supabase Auth -> public.profiles)
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Is Admin Helper (Security Definer to avoid recursion)
CREATE OR REPLACE FUNCTION public.is_admin() 
RETURNS BOOLEAN 
LANGUAGE plpgsql 
SECURITY DEFINER 
SET search_path = public 
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 
    FROM profiles 
    WHERE id = auth.uid() 
    AND role = 'admin'
  );
END;
$$;

-- ==========================================
-- RLS POLICIES
-- ==========================================

-- PROFILES
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;

CREATE POLICY "Users can view own profile" ON profiles FOR
SELECT USING (auth.uid () = id);

DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;

CREATE POLICY "Admins can view all profiles" ON profiles FOR
SELECT USING (is_admin ());

DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

CREATE POLICY "Users can update own profile" ON profiles
FOR UPDATE
    USING (auth.uid () = id);

DROP POLICY IF EXISTS "Admins can update all profiles" ON profiles;

CREATE POLICY "Admins can update all profiles" ON profiles
FOR UPDATE
    USING (is_admin ());

-- CV SESSIONS
DROP POLICY IF EXISTS "Users can view own sessions" ON cv_sessions;

CREATE POLICY "Users can view own sessions" ON cv_sessions FOR
SELECT USING (auth.uid () = user_id);

DROP POLICY IF EXISTS "Users can insert own sessions" ON cv_sessions;

CREATE POLICY "Users can insert own sessions" ON cv_sessions FOR INSERT
WITH
    CHECK (auth.uid () = user_id);

DROP POLICY IF EXISTS "Users can update own sessions" ON cv_sessions;

CREATE POLICY "Users can update own sessions" ON cv_sessions
FOR UPDATE
    USING (auth.uid () = user_id);

-- CHAT MESSAGES
DROP POLICY IF EXISTS "Users can view messages from their sessions" ON chat_messages;

CREATE POLICY "Users can view messages from their sessions" ON chat_messages FOR
SELECT USING (
        EXISTS (
            SELECT 1
            FROM cv_sessions
            WHERE
                cv_sessions.id = chat_messages.session_id
                AND cv_sessions.user_id = auth.uid ()
        )
    );

DROP POLICY IF EXISTS "Users can insert messages to their sessions" ON chat_messages;

CREATE POLICY "Users can insert messages to their sessions" ON chat_messages FOR INSERT
WITH
    CHECK (
        EXISTS (
            SELECT 1
            FROM cv_sessions
            WHERE
                cv_sessions.id = chat_messages.session_id
                AND cv_sessions.user_id = auth.uid ()
        )
    );

-- COMPANY COMPARISONS
DROP POLICY IF EXISTS "Users can view own comparisons" ON company_comparisons;

CREATE POLICY "Users can view own comparisons" ON company_comparisons FOR
SELECT USING (auth.uid () = user_id);

DROP POLICY IF EXISTS "Users can insert own comparisons" ON company_comparisons;

CREATE POLICY "Users can insert own comparisons" ON company_comparisons FOR INSERT
WITH
    CHECK (auth.uid () = user_id);

-- CONSULTATION REQUESTS
DROP POLICY IF EXISTS "Users can view own consultation requests" ON consultation_requests;

CREATE POLICY "Users can view own consultation requests" ON consultation_requests FOR
SELECT USING (auth.uid () = user_id);

DROP POLICY IF EXISTS "Users can insert own consultation requests" ON consultation_requests;

CREATE POLICY "Users can insert own consultation requests" ON consultation_requests FOR INSERT
WITH
    CHECK (auth.uid () = user_id);

DROP POLICY IF EXISTS "Admins can update requests" ON consultation_requests;

CREATE POLICY "Admins can update requests" ON consultation_requests
FOR UPDATE
    USING (is_admin ());

DROP POLICY IF EXISTS "Admins can view all requests" ON consultation_requests;

CREATE POLICY "Admins can view all requests" ON consultation_requests FOR
SELECT USING (is_admin ());

-- CONTACT SUBMISSIONS
DROP POLICY IF EXISTS "Public can insert contact forms" ON contact_submissions;

CREATE POLICY "Public can insert contact forms" ON contact_submissions FOR INSERT
WITH
    CHECK (true);

DROP POLICY IF EXISTS "Admins can view contact forms" ON contact_submissions;

CREATE POLICY "Admins can view contact forms" ON contact_submissions FOR
SELECT USING (is_admin ());

-- ==========================================
-- PERMISSIONS
-- ==========================================
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;

GRANT ALL ON ALL TABLES IN SCHEMA public TO anon,
authenticated,
service_role;

GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon,
authenticated,
service_role;

GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO anon,
authenticated,
service_role;

-- ==========================================
-- Site Content Table (CMS)
-- ==========================================
CREATE TABLE IF NOT EXISTS site_content (
    key TEXT NOT NULL, -- e.g., 'home.heroTitle'
    lang TEXT NOT NULL, -- 'en', 'ar'
    value TEXT NOT NULL, -- The translated text
    section TEXT, -- e.g., 'home', 'nav'
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone ('utc'::text, now()),
    PRIMARY KEY (key, lang)
);

-- RLS Policies
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

-- Everyone can read
DROP POLICY IF EXISTS "Public read access" ON site_content;

CREATE POLICY "Public read access" ON site_content FOR
SELECT USING (true);

-- Only admins can update
DROP POLICY IF EXISTS "Admins can update" ON site_content;

CREATE POLICY "Admins can update" ON site_content FOR ALL USING (
    auth.uid () IN (
        SELECT id
        FROM profiles
        WHERE
            role = 'admin'
    )
);
-- Note: Using subquery instead of is_admin() function to be safe if function is missing/definer issues,
-- or ensure is_admin() exists. Ideally: USING (is_admin())

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

-- ==========================================
-- Migration: Public Consultation Requests
-- ==========================================

-- 1. Make user_id nullable to support anonymous users
ALTER TABLE consultation_requests ALTER COLUMN user_id DROP NOT NULL;

-- 2. Add explicit email column (since we can't join on profiles for anon users)
ALTER TABLE consultation_requests
ADD COLUMN IF NOT EXISTS email TEXT;

-- 3. RLS Policy: Public can insert
DROP POLICY IF EXISTS "Public can insert consultation requests" ON consultation_requests;

CREATE POLICY "Public can insert consultation requests" ON consultation_requests FOR INSERT
WITH
    CHECK (true);

-- 4. RLS Policy: Admins can view all (ensure this still holds)
-- (Existing policy "Admins can view all requests" should cover this if defined correctly)

-- =====================================================
-- System Config Initial Data for Optimization Platform
-- Run this SQL once to set up all required config keys
-- =====================================================

-- Clear existing entries (optional - uncomment if you want to reset)
-- DELETE FROM system_config WHERE key IN (
--   'price_basic', 'price_pro', 'price_premium',
--   'credits_cv_optimizer', 'credits_cv_creator',
--   'credits_competitor_analysis', 'credits_business_analyzer'
-- );

-- =====================================================
-- PRICING CONFIGURATION (SAR)
-- =====================================================
INSERT INTO
    system_config (
        key,
        value,
        description,
        group_name,
        is_secret
    )
VALUES (
        'price_basic',
        '49',
        'Basic package price in SAR',
        'pricing',
        false
    ),
    (
        'price_pro',
        '99',
        'Pro package price in SAR',
        'pricing',
        false
    ),
    (
        'price_premium',
        '199',
        'Premium package price in SAR',
        'pricing',
        false
    )
ON CONFLICT (key) DO
UPDATE
SET
    value = EXCLUDED.value,
    description = EXCLUDED.description;

-- =====================================================
-- CREDIT CONFIGURATION (per service usage)
-- =====================================================
INSERT INTO
    system_config (
        key,
        value,
        description,
        group_name,
        is_secret
    )
VALUES (
        'credits_cv_optimizer',
        '10',
        'Credits consumed per CV optimization',
        'credits',
        false
    ),
    (
        'credits_cv_creator',
        '15',
        'Credits consumed per CV creation',
        'credits',
        false
    ),
    (
        'credits_competitor_analysis',
        '20',
        'Credits consumed per competitor analysis',
        'credits',
        false
    ),
    (
        'credits_business_analyzer',
        '15',
        'Credits consumed per business analysis',
        'credits',
        false
    )
ON CONFLICT (key) DO
UPDATE
SET
    value = EXCLUDED.value,
    description = EXCLUDED.description;

-- =====================================================
-- PACKAGE CREDITS CONFIGURATION
-- =====================================================
INSERT INTO
    system_config (
        key,
        value,
        description,
        group_name,
        is_secret
    )
VALUES (
        'credits_basic',
        '50',
        'Credits included in Basic package',
        'packages',
        false
    ),
    (
        'credits_pro',
        '150',
        'Credits included in Pro package',
        'packages',
        false
    ),
    (
        'credits_premium',
        '500',
        'Credits included in Premium package',
        'packages',
        false
    )
ON CONFLICT (key) DO
UPDATE
SET
    value = EXCLUDED.value,
    description = EXCLUDED.description;

-- =====================================================
-- VERIFICATION: Show all inserted configs
-- =====================================================
SELECT key, value, group_name, description
FROM system_config
ORDER BY group_name, key;

INSERT INTO
    system_config (
        key,
        value,
        description,
        group_name,
        is_secret
    )
VALUES (
        'about_image_url',
        'https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?q=80&w=2070&auto=format&fit=crop',
        'Image URL for About Us (من نحن) section on homepage',
        'content',
        false
    )
ON CONFLICT (key) DO NOTHING;