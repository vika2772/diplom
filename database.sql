-- Сначала создаем таблицу ролей
CREATE TABLE Roles (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE
);

-- Теперь создаем таблицу пользователей
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    birthday DATE,
    sex VARCHAR(1) CHECK (sex IN ('M', 'F', 'O')), -- 'O' для Other
    phone VARCHAR(15) UNIQUE,
    password_hash VARCHAR(255) NOT NULL, -- Пароль в хешированном виде
    role_id INTEGER NOT NULL REFERENCES Roles(role_id),
);


CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    type VARCHAR(255) NOT NULL,
    deadline DATE NOT NULL, 
    date_create DATE NOT NULL,
    status BOOLEAN NOT NULL,
    user_id INTEGER NOT NULL, 
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);


CREATE TABLE module_files (
  id SERIAL PRIMARY KEY,
  module_id INT REFERENCES modules(id) ON DELETE CASCADE,
  file_name VARCHAR(255) NOT NULL,
  file_data BYTEA NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);