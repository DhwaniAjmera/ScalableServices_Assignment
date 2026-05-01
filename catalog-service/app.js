const express = require('express');
const db = require('./db');

const app = express();
app.use(express.json());

app.get('/health', (req, res) => res.json({ status: "UP" }));

app.get('/v1/products', async (req, res) => {
  const [rows] = await db.query("SELECT * FROM products");
  res.json(rows);
});

app.get('/v1/products/:sku', async (req, res) => {
  const [rows] = await db.query("SELECT * FROM products WHERE sku=?", [req.params.sku]);
  res.json(rows[0]);
});

app.listen(3001);