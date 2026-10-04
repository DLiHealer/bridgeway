CREATE TABLE registrations (
  email TEXT PRIMARY KEY,
  status TEXT NOT NULL DEFAULT 'pending', -- pending | approved | rejected
  created_at INTEGER NOT NULL,
  decided_at INTEGER
);
