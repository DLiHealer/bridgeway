CREATE TABLE user_data (
  email TEXT NOT NULL,
  slice TEXT NOT NULL,
  json TEXT NOT NULL,
  updated_at INTEGER NOT NULL,
  PRIMARY KEY (email, slice)
);
