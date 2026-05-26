CREATE TABLE messages (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  author     TEXT    NOT NULL,
  content    TEXT    NOT NULL,
  created_at TEXT    DEFAULT (datetime('now'))
);