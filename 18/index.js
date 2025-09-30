import express from 'express'
import bodyParser from 'body-parser'
import { connectDB } from './db.js'
import { PORT, SECRET } from './config.js'
import { userRoute } from './src/routes/userRoute.js'
import session from 'express-session'
import { categoryRoute } from './src/routes/categoryRoute.js'
import { productRoute } from './src/routes/productRoute.js'
import exphbs, { engine } from 'express-handlebars'
import path, { dirname } from 'path'
import { homeView } from './src/controllers/generalController.js'
import { fileURLToPath } from 'url'
import methodOverride from "method-override"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Instancia del servidor de express
const app = express()
app.use(methodOverride("_method"))

// Configuramos handlebars como nuestro template engine
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", "./src/views")

// Configuramos la ruta estatica de imagenes
// app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static('public'))



// app.engine(".handlebars", exphbs.engine({ 
//   defaultLayout: "main",
//   layoutsDir: path.join(app.get("views"), "layouts"),
//   partialsDir: path.join(app.get("views"), "partials"),
//   extname: ".handlebars",
// }));

// Conexion a la base de datos
connectDB()

//Con app.use aplicamos metodos de dependencias en nuestro servidor

// Middlewares -> Software del medio - Entre dos sistemas
// Parsear a json las solicitudes
app.use(bodyParser.json())

// Parsear el cuerpo de la solicitud para que pueda ser leida
app.use(bodyParser.urlencoded({extended: true}))

// Generamos el uso de la sesion
app.use(
    session({
        secret: SECRET, // Dato unico de nuestro sistema
        resave: false, // Evita que la sesion se vuelva a guardar si no hay datos
        saveUninitialized: false, // Evita que se guarde una sesion no inicializada
    })
)

// Ruta base inicial
app.get("/", homeView)

//Rutas base - Agrupa las rutas de un recurso
app.use("/user", userRoute)
app.use("/category", categoryRoute)
app.use("/product", productRoute)

// Crear la escucha del servidor, para hacerlo correr
app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`)
})
