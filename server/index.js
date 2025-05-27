const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

const clients = [];

const values = [];


app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/stream', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
 
  res.flushHeaders();

  clients.push(res);

  req.on('close', () => {
    const idx = clients.indexOf(res);
    if (idx !== -1) clients.splice(idx, 1);
  });
});

setInterval(() => {
  const randomValue = Math.floor(Math.random() * 101);
  const timestamp = new Date().toISOString();
  const data = { value: randomValue, time: timestamp };

  values.push(data);
}, 1000);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
