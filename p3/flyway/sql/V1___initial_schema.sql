CREATE TABLE message (
  id SERIAL PRIMARY KEY,
  user_token CHAR(32) NOT NULL,
  content TEXT,
  time BIGINT NOT NULL,
  point INTEGER NOT NULL
);

CREATE TABLE reply (
  id SERIAL PRIMARY KEY,
  message_id INTEGER REFERENCES message(id),
  user_token CHAR(32) NOT NULL,
  content TEXT,
  time BIGINT NOT NULL,
  point INTEGER NOT NULL
);

INSERT INTO message (user_token, content, time, point) VALUES
  ('CTAVtq4Mbx5rfkQy2lRQ58lNg15snOD7', 'Hello, world!', 1669934501259, 0),
  ('CTAVtq4Mbx5rfkQy2lRQ58lNg15snOD7', 'No cross, no crown.', 1669934503259, 3),
  ('CTAVtq4Mbx5rfkQy2lRQ58lNg15snOD7', 'Sometime ever, sometime never.', 1669934507259, 9),
  ('CTAVtq4Mbx5rfkQy2lRQ58lNg15snOD7', 'No fear of words, no fear of years.', 1669934521059, 18),
  ('CTAVtq4Mbx5rfkQy2lRQ58lNg15snOD7', 'Don’t let the past steal your present.', 1669934531259, -17),
  ('CTAVtq4Mbx5rfkQy2lRQ58lNg15snOD7', 'Better late than never.', 1669934543259, -1),
  ('CTAVtq4Mbx5rfkQy2lRQ58lNg15snOD7', 'Be cheerful and hopeful.', 1669934556359, -4),
  ('CTAVtq4Mbx5rfkQy2lRQ58lNg15snOD7', 'Life is short and you deserve to be happy.', 1669934567259, 1),
  ('CTAVtq4Mbx5rfkQy2lRQ58lNg15snOD7', 'You can’t be perfect but you can be unique.', 1669934572159, 6),
  ('CTAVtq4Mbx5rfkQy2lRQ58lNg15snOD7', 'Travel far enough you meet yourself.', 1669934584059, 8),
  ('CTAVtq4Mbx5rfkQy2lRQ58lNg15snOD7', 'Light tomorrow with today.', 1669934592159, -9),
  ('CTAVtq4Mbx5rfkQy2lRQ58lNg15snOD7', 'A man’s best friends are his ten fingers.', 1669934599259, -31),
  ('CTAVtq4Mbx5rfkQy2lRQ58lNg15snOD7', 'The best way to predict the future is to create it.', 1669934607259, 0);
