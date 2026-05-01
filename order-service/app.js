const express = require('express');
const db = require('./db');
const axios = require('axios');

const app = express();
app.use(express.json());

app.post('/v1/orders', async (req, res) => {
  const key = req.headers['idempotency-key'];

  const [existing] = await db.query(
    "SELECT * FROM idempotency_keys WHERE id=?", [key]
  );

  if (existing.length)
    return res.json(JSON.parse(existing[0].response));

  const { items } = req.body;

  try {
    for (let item of items) {
      await axios.post('http://inventory-service:3002/v1/inventory/reserve', item);
    }

    let total = 0;

    for (let item of items) {
      const product = await axios.get(
        `http://catalog-service:3001/v1/products/${item.sku}`
      );
      total += product.data.price * item.qty;
    }

    total = total * 1.05;

    await axios.post(
      'http://payment-service:3004/v1/payments/charge',
      { orderId: Date.now(), amount: total },
      { headers: { 'idempotency-key': key } }
    );

    const order = { id: Date.now(), total, status: "CONFIRMED" };

    await db.query("INSERT INTO orders VALUES (?, ?, ?)", [
      order.id, order.status, total
    ]);

    await db.query(
      "INSERT INTO idempotency_keys VALUES (?, ?)",
      [key, JSON.stringify(order)]
    );

    res.json(order);

  } catch (err) {
    res.status(500).json({ error: "Order failed" });
  }
});

app.listen(3003);