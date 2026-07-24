-- ============================================================================
-- LnD Hackathon Registration System — Schema
-- Run once against your Neon (PostgreSQL) database:
--   psql "$DATABASE_URL" -f sql/schema.sql
-- ============================================================================

CREATE TABLE IF NOT EXISTS hackathon_registrations (
  id                SERIAL PRIMARY KEY,
  college_name      VARCHAR(255) NOT NULL,
  college_email     VARCHAR(255) NOT NULL,
  professor_name    VARCHAR(255) NOT NULL,
  professor_phone   VARCHAR(15)  NOT NULL,
  pincode           VARCHAR(6)   NOT NULL,
  hackathon_date    DATE         NOT NULL UNIQUE,
  status            VARCHAR(20)  NOT NULL DEFAULT 'confirmed'
                     CHECK (status IN ('confirmed', 'cancelled', 'completed')),
  created_at        TIMESTAMPTZ  NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ  NOT NULL DEFAULT now(),

  CONSTRAINT college_email_format CHECK (college_email ~* '^[^\s@]+@[^\s@]+\.[^\s@]{2,}$'),
  CONSTRAINT professor_phone_format CHECK (professor_phone ~ '^[6-9][0-9]{9}$'),
  CONSTRAINT pincode_format CHECK (pincode ~ '^[1-9][0-9]{5}$')
);

-- One lookup per date is the hot path (booked-dates + duplicate checks)
CREATE INDEX IF NOT EXISTS idx_hackathon_registrations_date
  ON hackathon_registrations (hackathon_date);

-- Prevents the same college registering twice for the same Saturday
-- (defence-in-depth; hackathon_date is already globally UNIQUE, but this
-- keeps the constraint meaningful if that ever changes to allow multiple
-- tracks/colleges per date in the future).
CREATE UNIQUE INDEX IF NOT EXISTS idx_hackathon_registrations_college_date
  ON hackathon_registrations (college_email, hackathon_date);

-- Keep updated_at current on every row change
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_hackathon_registrations_updated_at ON hackathon_registrations;

CREATE TRIGGER trg_hackathon_registrations_updated_at
  BEFORE UPDATE ON hackathon_registrations
  FOR EACH ROW
  EXECUTE FUNCTION set_updated_at();
