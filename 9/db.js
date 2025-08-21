// db.js
const mysql = require('mysql2');

// Configuración de la conexión
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root', // <<-- Reemplaza con tu usuario de MySQL
  password: '', // <<-- Reemplaza con tu contraseña
  database: 'biblioteca',
  port: 3301
});

// Conexión a la base de datos
connection.connect(err => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err.stack);
    return;
  }
  console.log('Conexión exitosa a la base de datos con ID:', connection.threadId);
});

module.exports = connection;