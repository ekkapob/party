-- password: 'password'
INSERT INTO accounts (email, password)
VALUES (
  'john@email.com',
  '$2a$10$if8TjLED6TqDXREajWsgIOAqcBG.XgrwrAQmn8fp2pi4gtaJ6xPjG'
);

-- password: 'helloworld'
INSERT INTO accounts (email, password)
VALUES (
  'james@email.com',
  '$2a$10$cuNt.49o2mC84Owi851x0.fhvqRmLhorCgJ.nTv9zJwxPZ31ZVlI6'
);

-- create a party
INSERT INTO parties (title, account_id)
VALUES (
  'หาก๊วนร่วมหาร',
  (SELECT id FROM accounts WHERE email = 'john@email.com')
);

-- join a party
INSERT INTO accounts_parties (account_id, party_id)
VALUES (
  (SELECT id FROM accounts WHERE email = 'james@email.com'),
  (SELECT id from parties WHERE title = 'หาก๊วนร่วมหาร')
);
