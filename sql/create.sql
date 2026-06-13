CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE cards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    card_number VARCHAR(16) NOT NULL,
    card_holder VARCHAR(150) NOT NULL,
    expiry DATE NOT NULL,
    cvv SMALLINT NOT NULL,

    email VARCHAR(255) NOT NULL,
    country CHAR(3) NOT NULL,
    street TEXT NOT NULL,
    apartment VARCHAR(60),
    city VARCHAR(60) NOT NULL,
    zip INT NOT NULL
);

CREATE INDEX idx_cards_email ON cards(email);