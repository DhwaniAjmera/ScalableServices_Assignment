CREATE TABLE payments (
  payment_id BIGINT PRIMARY KEY,
  order_id BIGINT,
  amount DECIMAL(10,2),
  status VARCHAR(20)
);

CREATE TABLE idempotency_keys (
  id VARCHAR(100) PRIMARY KEY,
  response TEXT
);