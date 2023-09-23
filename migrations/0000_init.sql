-- Migration number: 0000 	 2023-09-23T17:11:33.474Z
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime')),
  updated_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime'))
);
INSERT INTO users (username)
VALUES ('Maria Anders'),
  ('Around the Horn');
