import express from 'express';

const app = express();

app.get('/', (_req, res) => {
  res.send('¡Hola, mundo!');
});

app.listen(3000, () => {
  console.log('La aplicación está corriendo en el puerto 3000.');
});
