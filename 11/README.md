# 📚 Documentación del Backend - Sistema de Gestión

## 🏗️ **Arquitectura del Proyecto**

Este backend está construido con **Node.js** y **Express.js**, utilizando **MongoDB** como base de datos con **Mongoose** como ODM (Object Document Mapping). Implementa una arquitectura **MVC** (Model-View-Controller) con capas de servicios para separar la lógica de negocio.

### **Estructura del Proyecto**
```
11/
├── src/
│   ├── controllers/     # Controladores (lógica de endpoints)
│   ├── models/          # Modelos de datos (Mongoose schemas)
│   ├── services/        # Lógica de negocio
│   ├── routes/          # Definición de rutas
│   ├── middlewares/     # Middlewares personalizados
│   └── utils/           # Utilidades y helpers
├── config.js            # Configuración de variables de entorno
├── db.js               # Conexión a la base de datos
├── index.js            # Punto de entrada de la aplicación
└── package.json        # Dependencias y scripts
```

## 🚀 **Configuración e Instalación**

### **Dependencias Principales**
```json
{
  "dependencies": {
    "express": "^5.1.0",           // Framework web
    "mongoose": "^8.18.0",         // ODM para MongoDB
    "bcrypt": "^6.0.0",          // Encriptación de contraseñas
    "jsonwebtoken": "^9.0.2",    // JWT para autenticación
    "cors": "^2.8.5",            // CORS para comunicación frontend
    "body-parser": "^2.2.0",     // Parseo de datos HTTP
    "express-session": "^1.18.2" // Manejo de sesiones
  }
}
```

### **Variables de Entorno Requeridas**
```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017
UTN_DB=utn_database
SECRET=tu_secreto_jwt_aqui
```

### **Scripts Disponibles**
```bash
npm start    # Inicia el servidor en producción
npm run dev  # Inicia el servidor en modo desarrollo con nodemon
```

## 📊 **Modelos de Datos**

### **1. Modelo de Usuario (`userModel.js`)**

**Campos del Schema:**
- `name`: String (2-20 chars, required, lowercase, trim)
- `lastName`: String (2-20 chars, required, lowercase, trim)
- `email`: String (6-30 chars, required, unique, lowercase, email validation)
- `age`: Number (16-110, required)
- `password`: String (validated with custom regex, required)

**Validaciones:**
- Email único y formato válido
- Contraseña: 6-12 caracteres, al menos 1 número, 1 mayúscula, 1 minúscula
- Encriptación automática con bcrypt (salt rounds: 10)

**Timestamps:** `createdAt`, `updatedAt`

### **2. Modelo de Categoría (`categoryModel.js`)**

**Campos del Schema:**
- `name`: String (2-30 chars, required, unique, lowercase, trim)

**Timestamps:** `createdAt`, `updatedAt`

### **3. Modelo de Producto (`productModel.js`)**

**Campos del Schema:**
- `name`: String (3-50 chars, required, unique, lowercase, trim)
- `price`: Number (min: 1, required)
- `profitRate`: Number (default: 1.30, min: 1)
- `description`: String (5-200 chars, optional)
- `status`: String (enum: "AVAILABLE", "NOT AVAILABLE", "DISCONTINUED")
- `category`: ObjectId (referencia a Category)
- `stock`: Number (default: 0, min: 0)
- `highlighted`: Boolean (default: false)

**Métodos de Instancia:**
- `decreaseStock(amount)`: Reduce el stock del producto

**Propiedades Virtuales:**
- `priceWithProfitRate`: Calcula precio con margen de ganancia

**Timestamps:** `createdAt`, `updatedAt`

## 🛠️ **Servicios (Lógica de Negocio)**

### **UserService**
```javascript
// Funciones disponibles:
createUserService(userData)     // Crear usuario
getUsersService()              // Obtener todos los usuarios
deleteUserService(userId)       // Eliminar usuario
updateUserService(userId, data) // Actualizar usuario
validateUserService(email, password) // Autenticación
```

### **CategoryService**
```javascript
// Funciones disponibles:
createCategoryService(name)      // Crear categoría
getCategoriesService()         // Obtener todas las categorías
deleteCategoryService(id)      // Eliminar categoría
```

### **ProductService**
```javascript
// Funciones disponibles:
createProductService(data)       // Crear producto
getProductsService()          // Obtener todos los productos (con populate)
findProductByNameService(name) // Buscar producto por nombre
findProductByIdService(id)     // Buscar producto por ID
updateProductService(id, data) // Actualizar producto
deleteProductService(id)       // Eliminar producto
getStatusService()            // Obtener estados disponibles
```

## 🎯 **Controladores**

### **UserController**
- **POST** `/api/user/create` - Crear usuario
- **GET** `/api/user/getUsers` - Obtener usuarios
- **DELETE** `/api/user/deleteUser/:id` - Eliminar usuario
- **PATCH** `/api/user/updateUser/:id` - Actualizar usuario
- **POST** `/api/user/login` - Autenticación

### **CategoryController**
- **POST** `/api/category/create` - Crear categoría
- **GET** `/api/category/getCategories` - Obtener categorías
- **DELETE** `/api/category/delete/:id` - Eliminar categoría

### **ProductController**
- **GET** `/api/product/` - Obtener productos
- **POST** `/api/product/create` - Crear producto
- **POST** `/api/product/name` - Buscar por nombre
- **GET** `/api/product/find-by-id/:id` - Buscar por ID
- **PUT** `/api/product/update/:id` - Actualizar producto
- **DELETE** `/api/product/delete/:id` - Eliminar producto
- **GET** `/api/product/status` - Obtener estados

## 🔐 **Autenticación y Seguridad**

### **JWT (JSON Web Tokens)**
- **Algoritmo:** HS256
- **Duración:** 1 hora
- **Payload:** `{ userId, userEmail }`
- **Header:** `Authorization: Bearer <token>`

### **Encriptación de Contraseñas**
- **Algoritmo:** bcrypt
- **Salt Rounds:** 10
- **Encriptación automática:** Pre-save hook en el modelo

### **Middleware de Verificación**
```javascript
// Uso del middleware
verifyTokenMiddleware(req, res, next)
```

## 🛡️ **Middlewares**

### **CORS**
```javascript
// Configuración CORS
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
}))
```

### **Body Parser**
```javascript
// Parseo de JSON y URL-encoded
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
```

### **Sesiones**
```javascript
// Configuración de sesiones
app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false
}))
```

## 🔧 **Utilidades**

### **Validadores (`validators.js`)**
```javascript
isGoodPassword(value) // Valida formato de contraseña
```

### **Helpers de Usuario (`userHelpers.js`)**
```javascript
findUserByIdAndCheck(userId) // Valida existencia de usuario
```

### **Verificación de Token (`verifyToken.js`)**
```javascript
verifyToken(token) // Verifica y decodifica JWT
```

## 📡 **API Endpoints Completos**

### **Usuarios**
| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| POST | `/api/user/create` | Crear usuario | No |
| GET | `/api/user/getUsers` | Listar usuarios | No |
| DELETE | `/api/user/deleteUser/:id` | Eliminar usuario | No |
| PATCH | `/api/user/updateUser/:id` | Actualizar usuario | No |
| POST | `/api/user/login` | Autenticación | No |

### **Categorías**
| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| POST | `/api/category/create` | Crear categoría | No |
| GET | `/api/category/getCategories` | Listar categorías | No |
| DELETE | `/api/category/delete/:id` | Eliminar categoría | No |

### **Productos**
| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| GET | `/api/product/` | Listar productos | No |
| POST | `/api/product/create` | Crear producto | No |
| POST | `/api/product/name` | Buscar por nombre | No |
| GET | `/api/product/find-by-id/:id` | Buscar por ID | No |
| PUT | `/api/product/update/:id` | Actualizar producto | No |
| DELETE | `/api/product/delete/:id` | Eliminar producto | No |
| GET | `/api/product/status` | Obtener estados | No |

## 📝 **Ejemplos de Uso**

### **Crear Usuario**
```bash
POST /api/user/create
Content-Type: application/json

{
  "name": "juan",
  "lastName": "perez",
  "email": "juan@email.com",
  "age": 25,
  "password": "Password123"
}
```

### **Autenticación**
```bash
POST /api/user/login
Content-Type: application/json

{
  "email": "juan@email.com",
  "password": "Password123"
}
```

### **Crear Producto**
```bash
POST /api/product/create
Content-Type: application/json

{
  "name": "laptop gaming",
  "price": 1500,
  "profitRate": 1.30,
  "description": "Laptop para gaming de alta gama",
  "status": "AVAILABLE",
  "stock": 10,
  "highlighted": true
}
```

## 🚨 **Manejo de Errores**

### **Códigos de Estado HTTP**
- `200` - Operación exitosa
- `201` - Recurso creado exitosamente
- `204` - Sin contenido (no hay registros)
- `400` - Error de validación
- `404` - Recurso no encontrado
- `500` - Error interno del servidor

### **Formato de Respuesta de Error**
```json
{
  "message": "Descripción del error",
  "error": "Detalles técnicos del error"
}
```

## 🔄 **Flujo de Datos**

1. **Cliente** → **Ruta** → **Controlador** → **Servicio** → **Modelo** → **Base de Datos**
2. **Base de Datos** → **Modelo** → **Servicio** → **Controlador** → **Cliente**

## 📈 **Características Avanzadas**

### **Relaciones entre Modelos**
- Productos → Categorías (ObjectId reference)
- Populate automático en consultas de productos

### **Validaciones Automáticas**
- Encriptación de contraseñas
- Validación de email único
- Validación de contraseña con regex
- Validación de estados de producto

### **Funcionalidades Especiales**
- Búsqueda parcial por nombre de producto
- Cálculo automático de precio con margen
- Reducción de stock con validaciones
- Timestamps automáticos

## 🚀 **Despliegue**

### **Requisitos del Sistema**
- Node.js 18+
- MongoDB 4.4+
- Puerto 3001 disponible

### **Comandos de Despliegue**
```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env

# Iniciar en producción
npm start

# Iniciar en desarrollo
npm run dev
```

---

**Desarrollado con ❤️ usando Node.js, Express.js y MongoDB**
