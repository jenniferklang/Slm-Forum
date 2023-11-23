CREATE TABLE IF NOT EXISTS users (
  user_id serial PRIMARY KEY,
  name text NOT NULL,
  mail text UNIQUE NOT NULL,
  username text UNIQUE NOT NULL,
  password text NOT NULL,
  image_path text
);

CREATE TABLE IF NOT EXISTS topics (
  topic_id serial PRIMARY KEY,
  title text NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  created_by INTEGER NOT NULL,
  FOREIGN KEY (created_by) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS posts (
  post_id serial PRIMARY KEY,
  content text NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  created_by INTEGER NOT NULL,
  topic INTEGER NOT NULL,
  FOREIGN KEY (created_by) REFERENCES users(user_id),
  FOREIGN KEY (topic) REFERENCES topics(topic_id)
);


CREATE TABLE IF NOT EXISTS userTopics (
  user_id INTEGER NOT NULL,
  topic_id INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (topic_id) REFERENCES topics(topic_id)
);

CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(user_id),
  message TEXT,
  timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
