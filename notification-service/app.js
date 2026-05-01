const express = require('express');
const app = express();

app.use(express.json());

app.post('/notify', (req, res) => {
  console.log("Notification:", req.body);
  res.json({ status: "SENT" });
});

app.listen(3006);