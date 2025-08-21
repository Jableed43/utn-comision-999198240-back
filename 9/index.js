// index.js
const express = require('express');
const app = express();
const port = 3000;
const db = require('./db');
const { authorQueries, bookQueries, readerQueries } = require('./queries');

app.use(express.json());

// Ruta para obtener todos los autores
app.get('/autores', (req, res) => {
  db.query(authorQueries.getAllAuthors, (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err.stack);
      return res.status(500).json({ error: 'Error en la base de datos' });
    }
    res.json(results);
  });
});

// Ruta para obtener los 5 libros más prestados
app.get('/libros-mas-prestados', (req, res) => {
  db.query(bookQueries.getMostBorrowedBooks, (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err.stack);
      return res.status(500).json({ error: 'Error en la base de datos' });
    }
    res.json(results);
  });
});

// Ruta para obtener todos los lectores
app.get('/lectores', (req, res) => {
  db.query(readerQueries.getAllReaders, (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err.stack);
      return res.status(500).json({ error: 'Error en la base de datos' });
    }
    res.json(results);
  });
});

// Ruta para agregar un nuevo autor (ejemplo de INSERT)
app.post('/autores', (req, res) => {
  const { nombre, apellido, nacionalidad } = req.body;
  if (!nombre || !apellido) {
    return res.status(400).json({ error: 'Nombre y apellido son campos requeridos.' });
  }

  db.query(authorQueries.insertNewAuthor, [nombre, apellido, nacionalidad], (err, result) => {
    if (err) {
      console.error('Error al insertar el nuevo autor:', err.stack);
      return res.status(500).json({ error: 'Error en la base de datos al insertar el autor.' });
    }
    res.status(201).json({ message: 'Autor agregado con éxito.', id: result.insertId });
  });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});