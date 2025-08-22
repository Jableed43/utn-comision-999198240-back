// Armamos la conexion de nuestra base de datos
// Utilizando commonjs
const mysql = require('mysql2')

// Configuracion de la conexion
// Host, user, password, database (schema), port
const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "biblioteca",
    port: 3301
})

connection.connect(error => {
    if(error) {
        console.error("Error al conectar a la base de datos", error.stack, error.message)
    return
    }
    console.log("Conexion exitosa a la base de datos con ID:", connection.threadId)
})

module.exports = connection;