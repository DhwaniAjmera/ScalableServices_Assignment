CREATE TABLE inventory (
  sku VARCHAR(50),
  warehouse VARCHAR(50),
  on_hand INT,
  reserved INT,
  PRIMARY KEY (sku, warehouse)
);

INSERT INTO inventory VALUES
('SKU1', 'WH1', 10, 0),
('SKU2', 'WH1', 5, 0);