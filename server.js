

const express = require('express');
const path = require('path');


const app = express();
const PORT = 3000;

app.use(express.json()); 


app.use(express.static(path.join(__dirname, 'public')));

app.get(['/', '/happy-birthday'], (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});




app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}/`);
});