import express from 'express'
import bodyParser from 'body-parser'
import { connectDB } from './db.js'
import { PORT, SECRET } from './config.js'
import { userRoute } from './src/routes/userRoute.js'
import session from 'express-session'
import { categoryRoute } from './src/routes/categoryRoute.js'
import { productRoute } from './src/routes/productRoute.js'
import cors from 'cors'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import basicAuth from 'express-basic-auth'

// Instancia del servidor de express
const app = express()

// Cors sirve para que el backend pueda recibir solicitudes del frontend
app.use(cors({
    // Permitimos todas las conexiones de cualquier ip:puerto
    origin: "*",
    // Decidimos cuales metodos son permitidos
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
}))

// Conexion a la base de datos
connectDB()

// Configuración de autenticación básica para Swagger
// Credenciales para acceder a la documentación:
// Usuario: admin, Contraseña: swagger123
// Usuario: dev, Contraseña: dev123  
// Usuario: api-docs, Contraseña: docs2024
const swaggerAuth = basicAuth({
  users: { 
    'admin': 'swagger123',  // usuario: contraseña
    'dev': 'dev123',
    'api-docs': 'docs2024'
  },
  challenge: true,
  realm: 'Swagger Documentation - E-commerce API'
});

// Configuración de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'E-commerce API',
      version: '1.0.0',
      description: 'API para sistema de e-commerce con gestión de usuarios, categorías y productos',
      contact: {
        name: 'UTN Comisión 999198240',
        email: 'support@ecommerce-api.com'
      }
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Servidor de desarrollo'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        User: {
          type: 'object',
          required: ['name', 'lastName', 'email', 'age', 'password'],
          properties: {
            _id: {
              type: 'string',
              description: 'ID único del usuario',
              example: '507f1f77bcf86cd799439011'
            },
            name: {
              type: 'string',
              description: 'Nombre del usuario',
              example: 'Juan'
            },
            lastName: {
              type: 'string',
              description: 'Apellido del usuario',
              example: 'Pérez'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email del usuario',
              example: 'juan.perez@example.com'
            },
            age: {
              type: 'integer',
              minimum: 16,
              description: 'Edad del usuario',
              example: 25
            },
            password: {
              type: 'string',
              description: 'Contraseña del usuario (encriptada)',
              example: '$2b$10$encryptedpassword'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de creación',
              example: '2023-10-23T20:04:00.000Z'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de última actualización',
              example: '2023-10-23T20:04:00.000Z'
            }
          }
        },
        Category: {
          type: 'object',
          required: ['name'],
          properties: {
            _id: {
              type: 'string',
              description: 'ID único de la categoría',
              example: '507f1f77bcf86cd799439012'
            },
            name: {
              type: 'string',
              description: 'Nombre de la categoría',
              example: 'electrónicos'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de creación',
              example: '2023-10-23T20:04:00.000Z'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de última actualización',
              example: '2023-10-23T20:04:00.000Z'
            }
          }
        },
        Product: {
          type: 'object',
          required: ['name', 'price', 'description', 'category', 'stock'],
          properties: {
            _id: {
              type: 'string',
              description: 'ID único del producto',
              example: '507f1f77bcf86cd799439013'
            },
            name: {
              type: 'string',
              description: 'Nombre del producto',
              example: 'Smartphone Samsung Galaxy S23'
            },
            price: {
              type: 'number',
              description: 'Precio del producto',
              example: 899.99
            },
            description: {
              type: 'string',
              description: 'Descripción del producto',
              example: 'Teléfono inteligente con pantalla AMOLED de 6.1 pulgadas'
            },
            category: {
              type: 'string',
              description: 'ID de la categoría del producto',
              example: '507f1f77bcf86cd799439012'
            },
            stock: {
              type: 'integer',
              minimum: 0,
              description: 'Cantidad en stock',
              example: 50
            },
            status: {
              type: 'string',
              enum: ['AVAILABLE', 'NOT AVAILABLE', 'DISCONTINUED'],
              description: 'Estado del producto',
              example: 'AVAILABLE'
            },
            profitRate: {
              type: 'number',
              description: 'Tasa de ganancia (por defecto 0.2)',
              example: 0.2
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de creación',
              example: '2023-10-23T20:04:00.000Z'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de última actualización',
              example: '2023-10-23T20:04:00.000Z'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Mensaje de error',
              example: 'Error interno del servidor'
            },
            error: {
              type: 'string',
              description: 'Detalles del error',
              example: 'Validation failed'
            }
          }
        },
        Success: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Mensaje de éxito',
              example: 'Operación realizada correctamente'
            }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.js']
}

const swaggerSpec = swaggerJsdoc(swaggerOptions)

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

// Swagger UI con autenticación básica
app.use('/api-docs', swaggerAuth);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'E-commerce API Documentation'
}))

//Rutas base - Agrupa las rutas de un recurso
app.use("/api/user", userRoute)
app.use("/api/category", categoryRoute)
app.use("/api/product", productRoute)

// Crear la escucha del servidor, para hacerlo correr
app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`)
})
