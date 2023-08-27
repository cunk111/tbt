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

-- Creation of post table
CREATE TABLE IF NOT EXISTS post (
  p_id        uuid NOT NULL DEFAULT gen_random_uuid(), -- NOT NULL DEFAULT ?
	title       VARCHAR(60),
	details     TEXT,
	owner_id    uuid,
  created_at  TIMESTAMP NOT NULL DEFAULT current_timestamp,
  updated_at  TIMESTAMP NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (p_id),
  CONSTRAINT  fk_owner FOREIGN KEY(owner_id) REFERENCES user_account(u_id)
);

-- Creation of comment table
CREATE TABLE IF NOT EXISTS comment (
  c_id        uuid NOT NULL DEFAULT gen_random_uuid(),
	content     VARCHAR(320),
	owner_id    uuid,
	parent_id   uuid,
  created_at  TIMESTAMP NOT NULL DEFAULT current_timestamp,
  updated_at  TIMESTAMP NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (c_id),
  CONSTRAINT  fk_owner FOREIGN KEY(owner_id) REFERENCES user_account(u_id),
  CONSTRAINT  fk_parent FOREIGN KEY(parent_id) REFERENCES post(p_id)
);

CREATE TRIGGER update_customer
	BEFORE UPDATE ON user_account
	FOR EACH ROW EXECUTE PROCEDURE updated_at();

CREATE TRIGGER update_post
	BEFORE UPDATE ON post
	FOR EACH ROW EXECUTE PROCEDURE updated_at();

CREATE TRIGGER update_comment
	BEFORE UPDATE ON comment
	FOR EACH ROW EXECUTE PROCEDURE updated_at();