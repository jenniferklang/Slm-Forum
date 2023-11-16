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

CREATE TABLE IF NOT EXISTS comments (
  comment_id serial PRIMARY KEY,
  content text NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  created_by INTEGER NOT NULL,
  post INTEGER NOT NULL,
  FOREIGN KEY (created_by) REFERENCES users(user_id),
  FOREIGN KEY (post) REFERENCES posts(post_id)
)

CREATE TABLE IF NOT EXISTS userTopics (
  user_id INTEGER NOT NULL,
  topic_id INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (topic_id) REFERENCES topics(topic_id)
);

INSERT INTO users (name, mail, username, password, image_path) VALUES (
  'John Doe',
  'johndoe@example.com',
  'johndoe',
  'password',
  NULL
);

INSERT INTO topics (title, created_by) VALUES
  ('Hello World Topic', 1),
  ('Hello World Topic 2', 1),
  ('Hello World Topic 3', 1);

INSERT INTO posts (content, created_by, topic) VALUES (
  'Hello World Content!',
  1,
  1
);

INSERT INTO comments (content, created_by, post) VALUES (
  'Hello World!',
  1,
  1
)

INSERT INTO userTopics (user_id, topic_id) VALUES (
  1,
  1
);
