CREATE TABLE IF NOT EXISTS informations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    type VARCHAR(50),
    cellphone VARCHAR(15)
);

CREATE INDEX idx_nome ON informations (name);

CREATE INDEX idx_email ON informations (email);

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM informations) THEN
        INSERT INTO informations (name, email, type, cellphone)
        SELECT
            'Name ' || substr(md5(random()::text), 1, 8) AS name,
            substr(md5(random()::text), 1, 8) || '@exemplo.com' AS email,
            CASE WHEN random() < 0.5 THEN 'Tipo A' ELSE 'Tipo B' END AS type,
            '9' || (trunc(random() * 900000000 + 100000000)::text) AS cellphone
        FROM generate_series(1, 1000000) AS i;
    END IF;
END $$;
