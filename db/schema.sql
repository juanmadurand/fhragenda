CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    nickname VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    picture VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    auth_id VARCHAR(255) UNIQUE NOT NULL
);

-- Test user email: testuser1@test.com | Password: 6bxW4ELS2WgQag2!
INSERT INTO users (nickname, name, picture, email, auth_id)
VALUES ('testuser1', 'testuser1@test.com', 'https://s.gravatar.com/avatar/6a4b6cb2045fd55f706eaebd6ab5d4f7?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fte.png', 'testuser1@test.com', 'auth0|65a95faff01f362f4d8a7503');

CREATE TABLE contacts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, email)
);

INSERT INTO contacts (user_id, first_name, last_name, email, phone)
VALUES
  (1, 'John', 'Doe', 'john.doe@example.com', '123-456-7890'),
  (1, 'Jane', 'Smith', 'jane.smith@example.com', '987-654-3210'),
  (1, 'Alice', 'Johnson', 'alice.johnson@example.com', '555-123-4567');

CREATE TABLE contacts_history (
    id SERIAL PRIMARY KEY,
    contact_id INTEGER REFERENCES contacts(id) ON DELETE CASCADE,
    field VARCHAR(255) NOT NULL,
    old_value VARCHAR(255),
    new_value VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO contacts_history (contact_id, field, old_value, new_value)
VALUES
  (1, 'first_name', 'John', 'Johnny'),
  (1, 'last_name', 'Doe', 'Doeman'),
  (1, 'email', 'john.doe@example.com', 'johnny.d@example.com'),
  (1, 'phone', '123-456-7890', '987-654-3210'),

  (2, 'first_name', 'Jane', 'Janet'),
  (2, 'last_name', 'Smith', 'Smithson'),
  (2, 'email', 'jane.smith@example.com', 'janet.smith@example.com'),
  (2, 'phone', '987-654-3210', '555-123-4567'),

  (3, 'first_name', 'Alice', 'Alicia'),
  (3, 'last_name', 'Johnson', 'Johnsonson'),
  (3, 'email', 'alice.johnson@example.com', 'alicia.j@example.com'),
  (3, 'phone', '555-123-4567', '123-456-7890');
