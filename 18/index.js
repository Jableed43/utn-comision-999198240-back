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
import { errorHandler } from './src/middlewares/errorHandler.js'
import { registerHelpers } from './src/utils/helpers.js'
import Handlebars from 'handlebars'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()

// Middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride("_method"))

// Configurar Handlebars
app.engine("handlebars", engine({
    defaultLayout: false,
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
}))
app.set("view engine", "handlebars")
app.set("views", "./src/views")

// Registrar helpers de Handlebars
registerHelpers(Handlebars)

// Archivos estáticos
app.use(express.static('public'))

// Conexión a la base de datos
connectDB()

// Sesiones
app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
}))

// Middleware para pasar datos de sesión a las vistas
app.use((req, res, next) => {
    res.locals.session = req.session
    next()
})

// Ruta principal
app.get("/", homeView)

// Rutas
app.use("/user", userRoute)
app.use("/category", categoryRoute)
app.use("/product", productRoute)

// Middleware de manejo de errores (debe ir al final)
app.use(errorHandler)

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`)
    console.log(`📊 Sistema de Gestión CRUD con Handlebars`)
    console.log(`🔗 Rutas disponibles:`)
    console.log(`   - / (Inicio)`)
    console.log(`   - /user/create (Registrar usuario)`)
    console.log(`   - /user/login (Iniciar sesión)`)
    console.log(`   - /user/getAll (Lista de usuarios)`)
    console.log(`   - /category/getAll (Lista de categorías)`)
    console.log(`   - /product/getAll (Lista de productos)`)
})