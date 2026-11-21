
CREATE TABLE customers (
                           id BIGSERIAL PRIMARY KEY,
                           name VARCHAR(100) NOT NULL,
                           email VARCHAR(255) NOT NULL UNIQUE,
                           phone VARCHAR(30),
                           company VARCHAR(150),
                           created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                           updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_customers_name
    ON customers(name);
