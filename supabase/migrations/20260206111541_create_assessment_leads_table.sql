/*
  # Create Assessment Leads Table

  1. New Tables
    - `assessment_leads`
      - `id` (uuid, primary key)
      - `name` (text, not null) - Lead's full name
      - `email` (text, not null) - Lead's email address
      - `company` (text, nullable) - Company name if provided
      - `created_at` (timestamptz) - Timestamp of submission

  2. Security
    - Enable RLS on `assessment_leads` table
    - No policies needed as this is for capturing anonymous leads
    - Consider this table as public-facing for lead collection
*/

CREATE TABLE IF NOT EXISTS assessment_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  company text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE assessment_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow inserting assessment leads"
  ON assessment_leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view their own leads"
  ON assessment_leads
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = id::text OR EXISTS (
    SELECT 1 FROM auth.users WHERE auth.users.id = auth.uid()
  ));
