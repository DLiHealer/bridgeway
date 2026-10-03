CREATE TABLE login_tokens (
  hash TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  expires_at INTEGER NOT NULL,
  used INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL
);
CREATE INDEX idx_login_tokens_email ON login_tokens(email, created_at);

CREATE TABLE sessions (
  hash TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  expires_at INTEGER NOT NULL
);

CREATE TABLE reports (
  id TEXT PRIMARY KEY,
  owner_email TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  city TEXT NOT NULL,
  on_behalf INTEGER NOT NULL DEFAULT 0,
  responsible_body TEXT,
  created_at INTEGER NOT NULL
);

CREATE TABLE report_status (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  report_id TEXT NOT NULL REFERENCES reports(id),
  status TEXT NOT NULL,
  note TEXT NOT NULL DEFAULT '',
  actor_role TEXT NOT NULL,
  created_at INTEGER NOT NULL
);
CREATE INDEX idx_report_status_report ON report_status(report_id, id);
