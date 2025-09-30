# 🏗️ Diagramas de Arquitectura - Backend

## 📊 **Arquitectura General del Sistema**

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENTE (Frontend)                      │
│                    React + Vite + Router                        │
└─────────────────────┬───────────────────────────────────────────┘
                      │ HTTP Requests (REST API)
                      │ JSON Data
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                        SERVIDOR (Backend)                       │
│                    Node.js + Express.js                        │
└─────────────────────┬───────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                    CAPA DE RUTAS                               │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐              │
│  │ User Routes │ │Category Rts │ │Product Rts  │              │
│  └─────────────┘ └─────────────┘ └─────────────┘              │
└─────────────────────┬───────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                  CAPA DE CONTROLADORES                         │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐              │
│  │User Controller│ │Category Ctrl│ │Product Ctrl │              │
│  └─────────────┘ └─────────────┘ └─────────────┘              │
└─────────────────────┬───────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                    CAPA DE SERVICIOS                           │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐              │
│  │User Service  │ │Category Svc │ │Product Svc  │              │
│  └─────────────┘ └─────────────┘ └─────────────┘              │
└─────────────────────┬───────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                    CAPA DE MODELOS                             │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐              │
│  │User Model   │ │Category Mdl │ │Product Mdl  │              │
│  └─────────────┘ └─────────────┘ └─────────────┘              │
└─────────────────────┬───────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                    BASE DE DATOS                               │
│                    MongoDB                                     │
└─────────────────────────────────────────────────────────────────┘
```

## 🔄 **Flujo de Datos en una Petición**

```
1. CLIENTE
   │
   │ HTTP Request (POST /api/user/create)
   │ Content-Type: application/json
   │ Body: { "name": "juan", "email": "juan@email.com", ... }
   │
   ▼
2. EXPRESS SERVER
   │
   │ CORS Middleware
   │ Body Parser Middleware
   │ Session Middleware
   │
   ▼
3. ROUTER (/api/user)
   │
   │ userRoute.post("/create", createUser)
   │
   ▼
4. CONTROLLER (userController.js)
   │
   │ createUser(req, res) {
   │   const response = await createUserService(req.body)
   │   res.status(201).json(response)
   │ }
   │
   ▼
5. SERVICE (userService.js)
   │
   │ createUserService(userData) {
   │   const userExists = await User.findOne({ email: userData.email })
   │   if(userExists) throw new Error("User already exists")
   │   const newUser = new User(userData)
   │   await newUser.save()
   │   return { message: "User created" }
   │ }
   │
   ▼
6. MODEL (userModel.js)
   │
   │ Pre-save Hook: bcrypt.hashSync(password, 10)
   │ Validation: email unique, password regex, etc.
   │
   ▼
7. DATABASE (MongoDB)
   │
   │ Document saved in "users" collection
   │
   ▼
8. RESPONSE CHAIN
   │
   │ Database → Model → Service → Controller → Router → Client
   │ JSON Response: { "message": "User created" }
   │
   ▼
9. CLIENTE
   │
   │ HTTP Response (201 Created)
   │ Content-Type: application/json
   │ Body: { "message": "User created" }
```

## 🗂️ **Estructura de Directorios**

```
11/
├── 📁 src/
│   ├── 📁 controllers/          # Controladores (Lógica de endpoints)
│   │   ├── 📄 userController.js
│   │   ├── 📄 categoryController.js
│   │   └── 📄 productController.js
│   │
│   ├── 📁 models/               # Modelos de datos (Mongoose Schemas)
│   │   ├── 📄 userModel.js
│   │   ├── 📄 categoryModel.js
│   │   └── 📄 productModel.js
│   │
│   ├── 📁 services/             # Lógica de negocio
│   │   ├── 📄 userService.js
│   │   ├── 📄 categoryService.js
│   │   └── 📄 productService.js
│   │
│   ├── 📁 routes/               # Definición de rutas
│   │   ├── 📄 userRoute.js
│   │   ├── 📄 categoryRoute.js
│   │   └── 📄 productRoute.js
│   │
│   ├── 📁 middlewares/          # Middlewares personalizados
│   │   └── 📄 verifyTokenMiddleware.js
│   │
│   └── 📁 utils/                # Utilidades y helpers
│       ├── 📄 userHelpers.js
│       ├── 📄 validators.js
│       └── 📄 verifyToken.js
│
├── 📄 config.js                # Variables de entorno
├── 📄 db.js                    # Conexión a MongoDB
├── 📄 index.js                 # Punto de entrada
├── 📄 package.json             # Dependencias y scripts
└── 📄 README.md                # Documentación principal
```

## 🔐 **Sistema de Autenticación JWT**

```
┌─────────────────────────────────────────────────────────────────┐
│                    FLUJO DE AUTENTICACIÓN                      │
└─────────────────────────────────────────────────────────────────┘

1. LOGIN REQUEST
   │
   │ POST /api/user/login
   │ { "email": "user@email.com", "password": "Password123" }
   │
   ▼
2. VALIDATION
   │
   │ ✓ Email exists in database
   │ ✓ Password matches (bcrypt.compareSync)
   │
   ▼
3. JWT GENERATION
   │
   │ Payload: { userId: "64f8a1b2c3d4e5f6a7b8c9d0", userEmail: "user@email.com" }
   │ Secret: SECRET from environment
   │ Expires: 1 hour
   │
   ▼
4. TOKEN RESPONSE
   │
   │ { "message": "Logged in", "token": "eyJhbGciOiJIUzI1NiIs..." }
   │
   ▼
5. CLIENT STORAGE
   │
   │ localStorage.setItem('token', token)
   │
   ▼
6. PROTECTED REQUESTS
   │
   │ Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
   │
   ▼
7. TOKEN VERIFICATION
   │
   │ verifyTokenMiddleware() → verifyToken() → jwt.verify()
   │
   ▼
8. ACCESS GRANTED
   │
   │ req.user = { userId, userEmail }
   │ next() → Controller
```

## 🗄️ **Modelo de Base de Datos**

```
MongoDB Database: utn_database

┌─────────────────────────────────────────────────────────────────┐
│                        COLLECTIONS                              │
└─────────────────────────────────────────────────────────────────┘

📦 users
├── _id: ObjectId
├── name: String (2-20 chars, lowercase, trim)
├── lastName: String (2-20 chars, lowercase, trim)
├── email: String (6-30 chars, unique, lowercase, email format)
├── age: Number (16-110)
├── password: String (encrypted with bcrypt, salt rounds: 10)
├── createdAt: Date
└── updatedAt: Date

📦 categories
├── _id: ObjectId
├── name: String (2-30 chars, unique, lowercase, trim)
├── createdAt: Date
└── updatedAt: Date

📦 products
├── _id: ObjectId
├── name: String (3-50 chars, unique, lowercase, trim)
├── price: Number (min: 1)
├── profitRate: Number (default: 1.30, min: 1)
├── description: String (5-200 chars, optional)
├── status: String (enum: "AVAILABLE", "NOT AVAILABLE", "DISCONTINUED")
├── category: ObjectId (reference to categories._id)
├── stock: Number (default: 0, min: 0)
├── highlighted: Boolean (default: false)
├── createdAt: Date
└── updatedAt: Date
└── priceWithProfitRate: Virtual (price * profitRate)
```

## 🔄 **Relaciones entre Modelos**

```
┌─────────────────────────────────────────────────────────────────┐
│                    RELACIONES DE DATOS                          │
└─────────────────────────────────────────────────────────────────┘

users (1) ──────────── (N) products
  │                      │
  │                      │
  │                      │
  │                      ▼
  │                 categories (1) ──────────── (N) products
  │                      │
  │                      │
  │                      │
  │                      ▼
  │                 products.category → categories._id
  │
  │
  ▼
authentication
  │
  │ JWT Token contains:
  │ - userId (users._id)
  │ - userEmail (users.email)
  │
  ▼
protected routes
```

## 🛡️ **Middlewares y Seguridad**

```
┌─────────────────────────────────────────────────────────────────┐
│                    MIDDLEWARE STACK                             │
└─────────────────────────────────────────────────────────────────┘

1. CORS Middleware
   │
   │ Origin: "*"
   │ Methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
   │
   ▼
2. Body Parser Middleware
   │
   │ app.use(bodyParser.json())
   │ app.use(bodyParser.urlencoded({extended: true}))
   │
   ▼
3. Session Middleware
   │
   │ secret: SECRET
   │ resave: false
   │ saveUninitialized: false
   │
   ▼
4. Route Middlewares
   │
   │ verifyTokenMiddleware (for protected routes)
   │
   ▼
5. Controllers
   │
   │ Business logic execution
```

## 📊 **Estados de Respuesta HTTP**

```
┌─────────────────────────────────────────────────────────────────┐
│                    CÓDIGOS DE ESTADO                           │
└─────────────────────────────────────────────────────────────────┘

✅ 200 OK
   ├── Operación exitosa
   ├── GET /api/user/getUsers
   ├── GET /api/category/getCategories
   └── GET /api/product/

✅ 201 Created
   ├── Recurso creado exitosamente
   ├── POST /api/user/create
   ├── POST /api/category/create
   ├── POST /api/product/create
   ├── PATCH /api/user/updateUser/:id
   └── PUT /api/product/update/:id

⚠️ 204 No Content
   ├── Sin contenido (no hay registros)
   ├── GET /api/user/getUsers (empty array)
   ├── GET /api/category/getCategories (empty array)
   └── GET /api/product/ (empty array)

❌ 400 Bad Request
   ├── Error de validación
   ├── Campos faltantes
   ├── Formato de email inválido
   ├── Contraseña no cumple requisitos
   └── Usuario o contraseña incorrectos

❌ 404 Not Found
   ├── Usuario no encontrado
   ├── Categoría no encontrada
   └── Producto no encontrado

❌ 500 Internal Server Error
   ├── Error interno del servidor
   ├── Error de conexión a base de datos
   └── Error de procesamiento
```

---

**Diagramas generados para el Backend del Sistema de Gestión** 🚀
