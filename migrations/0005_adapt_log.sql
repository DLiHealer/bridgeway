CREATE TABLE adapt_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL,
  created_at INTEGER NOT NULL
);
CREATE INDEX adapt_log_email ON adapt_log (email, created_at);
