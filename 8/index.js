const express = require('express')
const app = express()
// Puerto en el que se va a levantar nuestra aplicacion
const port = 3000
const db = require('./db')
const { authorQueries, bookQueries, readerQueries } = require('./queries')

// No puede faltar
app.use(express.json())

//Rutas
 //Rutas de autores
 // Request -> lo que solicita un sistema a nosotros
 // Response -> lo que le respondemos a dicho sistema
 //todos los autores
app.get("/autores", (req, res) => {
    db.query(authorQueries.getAllAuthors, (error, results) => {
        if(error){
            console.error("Error al ejecutar la consulta:", error.stack, error.message)
        return res.status(500).json({ error: "Error en la base de datos" })
        }
        res.json(results)
    })
})

// todos los lectores
app.get("/lectores", (req, res) => {
    db.query(readerQueries.getAllReaders, (error, results) => {
        if(error){
            console.error("Error al ejecutar la consulta:", error.stack, error.message)
        return res.status(500).json({ error: "Error en la base de datos" })
        }
        res.json(results)
    })
})

//Libros mas prestados
app.get("/libros-mas-prestados", (req, res) => {
    db.query(bookQueries.getMostBorrowedBooks, (error, results) => {
        if(error){
            console.error("Error al ejecutar la consulta:", error.stack, error.message)
        return res.status(500).json({ error: "Error en la base de datos" })
        }
        res.json(results)
    })
})

// recibir request

app.post("/autores", (req, res) => {
    const {nombre, apellido, mensaje } = req.body;
    console.log({nombre, apellido, mensaje})
    if(req.body){
        res.status(200).json({messaje: "gracias vieja"})
    }
})


// Nunca debe faltar, sirve para correr el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`)
})