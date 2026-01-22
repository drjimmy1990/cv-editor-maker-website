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