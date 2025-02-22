-- Create database (this will error if database exists, which is fine)
CREATE DATABASE mirebcommercial;

\c mirebcommercial;

-- Create services table if it doesn't exist
CREATE TABLE IF NOT EXISTS services (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL
);

-- Create solutions table if it doesn't exist
CREATE TABLE IF NOT EXISTS solutions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL
);

-- Create contact table if it doesn't exist
CREATE TABLE IF NOT EXISTS contact (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    message TEXT NOT NULL
);

-- Create firebase_data table if it doesn't exist
CREATE TABLE IF NOT EXISTS firebase_data (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(100) NOT NULL,
    data JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data into firebase_data if table is empty
INSERT INTO firebase_data (user_id, data)
SELECT 'user_1', '{"field1": "value1", "field2": "value2"}'
WHERE NOT EXISTS (SELECT 1 FROM firebase_data WHERE user_id = 'user_1');

INSERT INTO firebase_data (user_id, data)
SELECT 'user_2', '{"field1": "value3", "field2": "value4"}'
WHERE NOT EXISTS (SELECT 1 FROM firebase_data WHERE user_id = 'user_2');