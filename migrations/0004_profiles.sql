CREATE TABLE profiles (
  email TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role_label TEXT NOT NULL DEFAULT 'Mieszkaniec',
  city TEXT NOT NULL DEFAULT '',
  bio TEXT NOT NULL DEFAULT '',
  updated_at INTEGER NOT NULL
);
