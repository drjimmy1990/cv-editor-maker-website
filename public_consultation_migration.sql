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