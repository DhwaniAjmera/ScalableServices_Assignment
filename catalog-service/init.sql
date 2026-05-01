CREATE TABLE products (
  product_id INT AUTO_INCREMENT PRIMARY KEY,
  sku VARCHAR(50),
  name VARCHAR(100),
  price DECIMAL(10,2)
);

INSERT INTO products (sku, name, price) VALUES
('SKU1', 'Laptop', 50000),
('SKU2', 'Phone', 20000);