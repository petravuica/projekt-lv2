const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

// Omogućavanje statičkih datoteka iz mape public
app.use(express.static('public'));
const PORT = 3000;

// Ruta za glavni ekran s galerijom slika
app.get('/', (req, res) => {
  const dataPath = path.join(__dirname, 'images.json');
  const images = JSON.parse(fs.readFileSync(dataPath));
  res.render('slike', { images });
});

// Ruta za galeriju slika, učitavanje slika iz mape /images
app.get('/images', (req, res) => {
  const folderPath = path.join(__dirname, 'public', 'images');
  const files = fs.readdirSync(folderPath);
  
  const images = files
    .filter(file => file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png'))
    .map((file, index) => ({
      url: `/images/${file}`,
      id: `photo${index + 1}`,
      title: `Slika ${index + 1}`
    }));

  res.render('slike', { images });
});
app.listen(PORT, () => {
  console.log(`Server je pokrenut na http://localhost:${PORT}`);
});
