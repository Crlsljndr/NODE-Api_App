const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'OK', time: new Date() });
});

app.get('/', (req, res) => {
  res.send('API Node funcionando 🚀');
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log('API escuchando en puerto', PORT);
});