CREATE TABLE IF NOT EXISTS userNumber (
    value INT NOT NULL,
    tg_id INT UNIQUE NOT NULL,
    expires_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    id INT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY
);