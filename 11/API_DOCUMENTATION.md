# 🔌 Documentación de API - Sistema de Gestión

## 📋 **Información General**

- **Base URL:** `http://localhost:3001`
- **Versión:** 1.0.0
- **Formato de Respuesta:** JSON
- **Autenticación:** JWT (Bearer Token)

## 🔐 **Autenticación**

### **Login de Usuario**
```http
POST /api/user/login
Content-Type: application/json

{
  "email": "usuario@email.com",
  "password": "Password123"
}
```

**Respuesta Exitosa (200):**
```json
{
  "message": "Logged in",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Respuesta de Error (400):**
```json
{
  "message": "User or password are incorrect"
}
```

## 👥 **Endpoints de Usuarios**

### **1. Crear Usuario**
```http
POST /api/user/create
Content-Type: application/json
```

**Body:**
```json
{
  "name": "juan",
  "lastName": "perez",
  "email": "juan@email.com",
  "age": 25,
  "password": "Password123"
}
```

**Respuesta Exitosa (201):**
```json
{
  "message": "User created"
}
```

**Validaciones:**
- `name`: 2-20 caracteres, requerido
- `lastName`: 2-20 caracteres, requerido
- `email`: 6-30 caracteres, único, formato válido
- `age`: 16-110 años, requerido
- `password`: 6-12 caracteres, al menos 1 número, 1 mayúscula, 1 minúscula

### **2. Obtener Todos los Usuarios**
```http
GET /api/user/getUsers
```

**Respuesta Exitosa (200):**
```json
[
  {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "name": "juan",
    "lastName": "perez",
    "email": "juan@email.com",
    "age": 25,
    "createdAt": "2023-09-06T10:30:00.000Z",
    "updatedAt": "2023-09-06T10:30:00.000Z"
  }
]
```

**Respuesta Sin Contenido (204):**
```http
HTTP/1.1 204 No Content
```

### **3. Actualizar Usuario**
```http
PATCH /api/user/updateUser/:id
Content-Type: application/json
```

**Body:**
```json
{
  "name": "juan carlos",
  "age": 26
}
```

**Respuesta Exitosa (201):**
```json
{
  "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
  "name": "juan carlos",
  "lastName": "perez",
  "email": "juan@email.com",
  "age": 26,
  "createdAt": "2023-09-06T10:30:00.000Z",
  "updatedAt": "2023-09-06T11:45:00.000Z"
}
```

### **4. Eliminar Usuario**
```http
DELETE /api/user/deleteUser/:id
```

**Respuesta Exitosa (200):**
```json
{
  "message": "User deleted succesfully"
}
```

**Respuesta de Error (404):**
```json
{
  "message": "User not found"
}
```

## 📂 **Endpoints de Categorías**

### **1. Crear Categoría**
```http
POST /api/category/create
Content-Type: application/json
```

**Body:**
```json
{
  "name": "electrónicos"
}
```

**Respuesta Exitosa (201):**
```json
{
  "_id": "64f8a1b2c3d4e5f6a7b8c9d1",
  "name": "electrónicos",
  "createdAt": "2023-09-06T10:30:00.000Z",
  "updatedAt": "2023-09-06T10:30:00.000Z"
}
```

**Validaciones:**
- `name`: 2-30 caracteres, único, requerido

### **2. Obtener Todas las Categorías**
```http
GET /api/category/getCategories
```

**Respuesta Exitosa (200):**
```json
[
  {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d1",
    "name": "electrónicos",
    "createdAt": "2023-09-06T10:30:00.000Z",
    "updatedAt": "2023-09-06T10:30:00.000Z"
  }
]
```

### **3. Eliminar Categoría**
```http
DELETE /api/category/delete/:id
```

**Respuesta Exitosa (200):**
```json
{
  "categoryDeleted": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d1",
    "name": "electrónicos"
  }
}
```

## 🛍️ **Endpoints de Productos**

### **1. Obtener Todos los Productos**
```http
GET /api/product/
```

**Respuesta Exitosa (200):**
```json
[
  {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d2",
    "name": "laptop gaming",
    "price": 1500,
    "profitRate": 1.30,
    "priceWithProfitRate": 1950,
    "description": "Laptop para gaming de alta gama",
    "status": "AVAILABLE",
    "category": {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d1",
      "name": "electrónicos"
    },
    "stock": 10,
    "highlighted": true,
    "createdAt": "2023-09-06T10:30:00.000Z",
    "updatedAt": "2023-09-06T10:30:00.000Z"
  }
]
```

### **2. Crear Producto**
```http
POST /api/product/create
Content-Type: application/json
```

**Body:**
```json
{
  "name": "laptop gaming",
  "price": 1500,
  "profitRate": 1.30,
  "description": "Laptop para gaming de alta gama",
  "status": "AVAILABLE",
  "category": "64f8a1b2c3d4e5f6a7b8c9d1",
  "stock": 10,
  "highlighted": true
}
```

**Respuesta Exitosa (200):**
```json
{
  "_id": "64f8a1b2c3d4e5f6a7b8c9d2",
  "name": "laptop gaming",
  "price": 1500,
  "profitRate": 1.30,
  "priceWithProfitRate": 1950,
  "description": "Laptop para gaming de alta gama",
  "status": "AVAILABLE",
  "category": "64f8a1b2c3d4e5f6a7b8c9d1",
  "stock": 10,
  "highlighted": true,
  "createdAt": "2023-09-06T10:30:00.000Z",
  "updatedAt": "2023-09-06T10:30:00.000Z"
}
```

**Validaciones:**
- `name`: 3-50 caracteres, único, requerido
- `price`: número, mínimo 1, requerido
- `profitRate`: número, mínimo 1, default 1.30
- `description`: 5-200 caracteres, opcional
- `status`: enum ["AVAILABLE", "NOT AVAILABLE", "DISCONTINUED"]
- `stock`: número, mínimo 0, default 0
- `highlighted`: boolean, default false

### **3. Buscar Producto por Nombre**
```http
POST /api/product/name
Content-Type: application/json
```

**Body:**
```json
{
  "name": "laptop"
}
```

**Respuesta Exitosa (200):**
```json
{
  "productExist": [
    {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d2",
      "name": "laptop gaming",
      "price": 1500,
      "profitRate": 1.30,
      "priceWithProfitRate": 1950,
      "description": "Laptop para gaming de alta gama",
      "status": "AVAILABLE",
      "category": "64f8a1b2c3d4e5f6a7b8c9d1",
      "stock": 10,
      "highlighted": true
    }
  ]
}
```

### **4. Buscar Producto por ID**
```http
GET /api/product/find-by-id/:id
```

**Respuesta Exitosa (200):**
```json
{
  "productExist": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d2",
    "name": "laptop gaming",
    "price": 1500,
    "profitRate": 1.30,
    "priceWithProfitRate": 1950,
    "description": "Laptop para gaming de alta gama",
    "status": "AVAILABLE",
    "category": "64f8a1b2c3d4e5f6a7b8c9d1",
    "stock": 10,
    "highlighted": true
  }
}
```

### **5. Actualizar Producto**
```http
PUT /api/product/update/:id
Content-Type: application/json
```

**Body:**
```json
{
  "price": 1600,
  "stock": 15,
  "highlighted": false
}
```

**Respuesta Exitosa (201):**
```json
{
  "_id": "64f8a1b2c3d4e5f6a7b8c9d2",
  "name": "laptop gaming",
  "price": 1600,
  "profitRate": 1.30,
  "priceWithProfitRate": 2080,
  "description": "Laptop para gaming de alta gama",
  "status": "AVAILABLE",
  "category": "64f8a1b2c3d4e5f6a7b8c9d1",
  "stock": 15,
  "highlighted": false,
  "createdAt": "2023-09-06T10:30:00.000Z",
  "updatedAt": "2023-09-06T12:15:00.000Z"
}
```

### **6. Eliminar Producto**
```http
DELETE /api/product/delete/:id
```

**Respuesta Exitosa (201):**
```json
{
  "message": "product deleted succesfully",
  "deletedProduct": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d2",
    "name": "laptop gaming",
    "price": 1600,
    "profitRate": 1.30,
    "priceWithProfitRate": 2080,
    "description": "Laptop para gaming de alta gama",
    "status": "AVAILABLE",
    "category": "64f8a1b2c3d4e5f6a7b8c9d1",
    "stock": 15,
    "highlighted": false
  }
}
```

### **7. Obtener Estados de Producto**
```http
GET /api/product/status
```

**Respuesta Exitosa (200):**
```json
["AVAILABLE", "NOT AVAILABLE", "DISCONTINUED"]
```

## 🚨 **Códigos de Error Comunes**

### **400 - Bad Request**
```json
{
  "message": "There's a missing field"
}
```

### **404 - Not Found**
```json
{
  "message": "User not found"
}
```

### **500 - Internal Server Error**
```json
{
  "message": "Internal server error",
  "error": "Detalles del error técnico"
}
```

## 📝 **Ejemplos de Uso con cURL**

### **Crear Usuario**
```bash
curl -X POST http://localhost:3001/api/user/create \
  -H "Content-Type: application/json" \
  -d '{
    "name": "juan",
    "lastName": "perez",
    "email": "juan@email.com",
    "age": 25,
    "password": "Password123"
  }'
```

### **Autenticación**
```bash
curl -X POST http://localhost:3001/api/user/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@email.com",
    "password": "Password123"
  }'
```

### **Crear Producto**
```bash
curl -X POST http://localhost:3001/api/product/create \
  -H "Content-Type: application/json" \
  -d '{
    "name": "laptop gaming",
    "price": 1500,
    "profitRate": 1.30,
    "description": "Laptop para gaming de alta gama",
    "status": "AVAILABLE",
    "stock": 10,
    "highlighted": true
  }'
```

## 🔧 **Configuración de Headers**

### **Para Autenticación (cuando esté implementada)**
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### **Para Contenido JSON**
```http
Content-Type: application/json
```

## 📊 **Estados de Respuesta HTTP**

| Código | Descripción | Uso |
|--------|-------------|-----|
| 200 | OK | Operación exitosa |
| 201 | Created | Recurso creado exitosamente |
| 204 | No Content | Sin contenido (no hay registros) |
| 400 | Bad Request | Error de validación |
| 404 | Not Found | Recurso no encontrado |
| 500 | Internal Server Error | Error interno del servidor |

---

**API desarrollada con Node.js, Express.js y MongoDB** 🚀
