const express = require('express');
const app = express();

app.use(express.json());

app.post('/v1/shipments', (req, res) => {
  res.json({
    shipment_id: Date.now(),
    status: "SHIPPED"
  });
});

app.listen(3005);