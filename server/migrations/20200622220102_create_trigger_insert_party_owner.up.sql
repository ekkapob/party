CREATE OR REPLACE FUNCTION trigger_insert_party_owner()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO accounts_parties (account_id, party_id)
  VALUES (NEW.account_id, NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
