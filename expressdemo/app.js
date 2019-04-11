const express = require('express');
let app = new express;
app.get('/', (req, res) => {
  res.send('你好express');
})
app.listen(3000, '127.0.0.1');
