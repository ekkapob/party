CREATE TABLE accounts_parties (
  account_id  INT REFERENCES accounts (id) ON UPDATE CASCADE ON DELETE CASCADE NOT NULL,
  party_id    INT REFERENCES parties (id) ON UPDATE CASCADE ON DELETE CASCADE NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT  accounts_parties_pkey PRIMARY KEY (account_id, party_id)
);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON accounts_parties
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();
