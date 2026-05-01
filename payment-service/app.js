const express = require('express');
const db = require('./db');

const app = express();
app.use(express.json());

app.post('/v1/payments/charge', async (req, res) => {
  const key = req.headers['idempotency-key'];

  const [existing] = await db.query(
    "SELECT * FROM idempotency_keys WHERE id=?",
    [key]
  );

  if (existing.length)
    return res.json(JSON.parse(existing[0].response));

  const { orderId, amount } = req.body;

  await db.query(
    "INSERT INTO payments VALUES (?, ?, ?, ?)",
    [Date.now(), orderId, amount, "SUCCESS"]
  );

  const response = { status: "SUCCESS" };

  await db.query(
    "INSERT INTO idempotency_keys VALUES (?, ?)",
    [key, JSON.stringify(response)]
  );

  res.json(response);
});

app.listen(3004);