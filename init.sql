-- Skapar tabellen cities om den inte redan finns i databasen.
CREATE TABLE IF NOT EXISTS cities (
  id serial PRIMARY KEY,
  name text UNIQUE NOT NULL,
  population INTEGER NOT NULL
);

-- Lägg till tre svenska städer.
-- I och med att name är unique kommer inga dubletter att läggas till och inga felmeddelanden kommer att visas.
INSERT INTO cities (name, population) VALUES
  ('Stockholm', 975904),
  ('Göteborg', 5836),
  ('Vänersborg', 347949),
  ('Malmö', 31251)
  ON CONFLICT (name) DO NOTHING;


  Users
  ID: INT
  Name: text
  Username: text
  Password: text
  Mail: text
  Image: ???
  Role: text

  Topics
  ID: INT
  Title: Text
  CreatedBy: INT (User)

  Posts
  ID: INT
  Content: text
  Time: Date
  CreatedBy: INT (User)
  Topic: INT (TopicID)

  -- Comments
  -- ID: INT
  -- Content: text
  -- Time: Date
  -- CreatedBy: INT (User)
  -- Post: INT (PostID)
