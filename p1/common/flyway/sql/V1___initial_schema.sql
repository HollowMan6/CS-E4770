CREATE TABLE lookup (
  id SERIAL PRIMARY KEY,
  tag TEXT NOT NULL,
  url TEXT NOT NULL
);

INSERT INTO lookup (tag, url) VALUES ('DmaECwm', 'https://www.google.com');
