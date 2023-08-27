-- Create trigger to update updated_at
CREATE OR REPLACE FUNCTION updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$
LANGUAGE plpgsql;

-- Creation of user table
CREATE TABLE IF NOT EXISTS user_account (
  u_id        uuid NOT NULL DEFAULT gen_random_uuid(),
  u_username  VARCHAR(60) NOT NULL,
  u_password  TEXT NOT NULL,
  email       VARCHAR(320) NOT NULL,
  created_at  TIMESTAMP NOT NULL DEFAULT current_timestamp,
  updated_at  TIMESTAMP NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (u_id)
);

CREATE TRIGGER update_customer
	BEFORE UPDATE ON user_account
	FOR EACH ROW EXECUTE PROCEDURE updated_at();
