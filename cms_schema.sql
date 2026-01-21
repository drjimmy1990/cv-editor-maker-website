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