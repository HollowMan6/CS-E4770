CREATE TABLE submissions (
  id SERIAL PRIMARY KEY,
  user_token CHAR(32) NOT NULL,
  question INTEGER NOT NULL,
  code TEXT,
  result VARCHAR(5) NOT NULL
);
