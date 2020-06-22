-- create accounts
INSERT INTO accounts (email, password, consent, subscription)
VALUES
-- password: 'password'
(
  'john@email.com',
  '$2a$10$PgHpjsm1swjPvS2YeCNfL.qu4xfOMmWrhEkU2BmRlYq/oeXvftV5O',
  TRUE,
  FALSE
),
-- password: 'helloworld'
(
  'james@email.com',
  '$2a$10$szD19l1Y/DY9RLIJQbXTvewA.ADRiBUsA3jhuPFIM.eOjb39HoaOO',
  FALSE,
  TRUE
);

-- create a party
INSERT INTO parties (title, owner_id)
VALUES
  ('หาก๊วนร่วมหาร 1', (SELECT id FROM accounts WHERE email = 'john@email.com')),
  ('หาก๊วนร่วมหาร 2', (SELECT id FROM accounts WHERE email = 'john@email.com')),
  ('หาก๊วนร่วมหาร 3', (SELECT id FROM accounts WHERE email = 'john@email.com')),
  ('หาก๊วนร่วมหาร 4', (SELECT id FROM accounts WHERE email = 'john@email.com')),
  ('หาก๊วนร่วมหาร 5', (SELECT id FROM accounts WHERE email = 'john@email.com')),
  ('หาก๊วนร่วมหาร 6', (SELECT id FROM accounts WHERE email = 'john@email.com')),
  ('หาก๊วนร่วมหาร 7', (SELECT id FROM accounts WHERE email = 'john@email.com')),
  ('หาก๊วนร่วมหาร 8', (SELECT id FROM accounts WHERE email = 'john@email.com')),
  ('หาก๊วนร่วมหาร 9', (SELECT id FROM accounts WHERE email = 'john@email.com')),
  ('หาก๊วนร่วมหาร 10', (SELECT id FROM accounts WHERE email = 'john@email.com')),
  ('หาก๊วนร่วมหาร 11', (SELECT id FROM accounts WHERE email = 'james@email.com')),
  ('หาก๊วนร่วมหาร 12', (SELECT id FROM accounts WHERE email = 'james@email.com')),
  ('หาก๊วนร่วมหาร 13', (SELECT id FROM accounts WHERE email = 'james@email.com')),
  ('หาก๊วนร่วมหาร 14', (SELECT id FROM accounts WHERE email = 'james@email.com')),
  ('หาก๊วนร่วมหาร 15', (SELECT id FROM accounts WHERE email = 'james@email.com')),
  ('หาก๊วนร่วมหาร 16', (SELECT id FROM accounts WHERE email = 'james@email.com')),
  ('หาก๊วนร่วมหาร 17', (SELECT id FROM accounts WHERE email = 'james@email.com')),
  ('หาก๊วนร่วมหาร 18', (SELECT id FROM accounts WHERE email = 'james@email.com')),
  ('หาก๊วนร่วมหาร 19', (SELECT id FROM accounts WHERE email = 'james@email.com')),
  ('หาก๊วนร่วมหาร 20', (SELECT id FROM accounts WHERE email = 'james@email.com'));

-- join a party
INSERT INTO accounts_parties (account_id, party_id)
VALUES (
  (SELECT id FROM accounts WHERE email = 'james@email.com'),
  (SELECT id from parties WHERE title = 'หาก๊วนร่วมหาร 1')
);
