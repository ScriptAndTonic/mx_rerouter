const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.post('/', async (req, res) => {
  try {
    const reRes = await axios.put('https://httpbin.org/put', { hello: 'world' });
    res.data.json;

    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
