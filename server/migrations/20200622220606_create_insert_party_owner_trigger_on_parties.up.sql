CREATE TRIGGER insert_party_owner
AFTER INSERT ON parties
FOR EACH ROW
EXECUTE PROCEDURE trigger_insert_party_owner();

