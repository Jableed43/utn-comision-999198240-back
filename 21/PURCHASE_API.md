# Sistema de Compras - API Documentation

## Configuración

1. Instalar dependencias:
```bash
npm install
```

2. Configurar variables de entorno en `.env`:
```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017
UTN_DB=utn_database
SECRET=your_secret_key_here

# Firebase Configuration
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
FIREBASE_APP_ID=your_app_id
```

## Arquitectura

- **MongoDB**: Se usa solo para productos (validación y actualización de stock)
- **Firebase Firestore**: Se usa como base de datos principal para las compras
- **Autenticación**: JWT para proteger los endpoints

## Endpoints

### 1. Crear Compra
**POST** `/api/purchase/create`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body:**
```json
{
  "userId": "ObjectId",
  "items": [
    {
      "productId": "ObjectId",
      "quantity": 2,
      "price": 100
    }
  ],
  "totalAmount": 200
}
```

**Response:**
```json
{
  "message": "Purchase created successfully",
  "data": {
    "id": "firebase_document_id",
    "userId": "ObjectId",
    "items": [...],
    "totalAmount": 200,
    "purchaseDate": "2024-01-01T00:00:00.000Z",
    "status": "COMPLETED",
    "timestamp": "2024-01-01T00:00:00.000Z"
  }
}
```

### 2. Obtener Compras por Usuario
**GET** `/api/purchase/user/:userId`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    "id": "firebase_document_id",
    "userId": "ObjectId",
    "items": [
      {
        "productId": "ObjectId",
        "quantity": 2,
        "price": 100
      }
    ],
    "totalAmount": 200,
    "purchaseDate": "2024-01-01T00:00:00.000Z",
    "status": "COMPLETED",
    "timestamp": "2024-01-01T00:00:00.000Z"
  }
]
```

### 3. Obtener Compra por ID
**GET** `/api/purchase/:purchaseId`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "id": "firebase_document_id",
  "userId": "ObjectId",
  "items": [
    {
      "productId": "ObjectId",
      "quantity": 2,
      "price": 100
    }
  ],
  "totalAmount": 200,
  "purchaseDate": "2024-01-01T00:00:00.000Z",
  "status": "COMPLETED",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### 4. Obtener Todas las Compras
**GET** `/api/purchase/`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** Array de compras (mismo formato que el endpoint anterior)

## Características

- **Base de datos híbrida**: MongoDB para productos, Firebase para compras
- **Control de stock**: Se valida y actualiza automáticamente el stock de productos en MongoDB
- **Almacenamiento en Firebase**: Las compras se guardan directamente en Firestore
- **Autenticación**: Todos los endpoints requieren token JWT válido
- **Consultas optimizadas**: Uso de índices de Firebase para consultas eficientes

## Códigos de Estado

- `201`: Compra creada exitosamente
- `200`: Operación exitosa
- `204`: No hay contenido (sin compras)
- `404`: Compra no encontrada
- `500`: Error interno del servidor