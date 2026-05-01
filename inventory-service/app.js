const express = require('express');
const db = require('./db');

const app = express();
app.use(express.json());

app.post('/v1/inventory/reserve', async (req, res) => {
  const { sku, qty } = req.body;

  const [result] = await db.query(
    `UPDATE inventory 
     SET reserved = reserved + ? 
     WHERE sku=? AND (on_hand - reserved) >= ?`,
    [qty, sku, qty]
  );

  if (result.affectedRows === 0)
    return res.status(400).json({ error: "Insufficient stock" });

  res.json({ status: "RESERVED" });
});

app.post('/v1/inventory/release', async (req, res) => {
  const { sku, qty } = req.body;

  await db.query(
    `UPDATE inventory SET reserved = reserved - ? WHERE sku=?`,
    [qty, sku]
  );

  res.json({ status: "RELEASED" });
});

app.listen(3002);