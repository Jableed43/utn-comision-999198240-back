# API de Subida de Imágenes - AWS S3

## Configuración

### Variables de Entorno Requeridas

Agrega estas variables a tu archivo `.env`:

```env
# AWS Configuration
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=tu_access_key_id
AWS_SECRET_ACCESS_KEY=tu_secret_access_key
AWS_S3_BUCKET_NAME=bucket-utn
```

### Instalación de Dependencias

```bash
npm install
```

## Endpoints

### 1. Crear Producto con Imagen
**POST** `/api/product/create`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Body (Form Data):**
```
name: "Laptop Gaming"
price: 1500
description: "High performance gaming laptop"
stock: 10
category: "ObjectId"
image: [archivo de imagen]
```

**Response:**
```json
{
  "_id": "ObjectId",
  "name": "laptop gaming",
  "price": 1500,
  "description": "High performance gaming laptop",
  "stock": 10,
  "imageUrl": "https://bucket-utn.s3.us-east-1.amazonaws.com/products/1234567890-123456789.jpg",
  "category": "ObjectId",
  "status": "AVAILABLE",
  "highlighted": false,
  "createdAt": "2024-01-15T14:30:00.000Z",
  "updatedAt": "2024-01-15T14:30:00.000Z"
}
```

### 2. Actualizar Producto con Nueva Imagen
**PUT** `/api/product/update/:id`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Body (Form Data):**
```
name: "Laptop Gaming Pro"
price: 1800
image: [nueva imagen]
```

**Nota:** La imagen anterior se elimina automáticamente de S3.

### 3. Obtener Producto con URL Firmada
**GET** `/api/product/find-by-id/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "_id": "ObjectId",
  "name": "laptop gaming",
  "price": 1500,
  "imageUrl": "https://bucket-utn.s3.us-east-1.amazonaws.com/products/1234567890-123456789.jpg?X-Amz-Algorithm=...",
  "stock": 10,
  "category": "ObjectId"
}
```

### 4. Obtener URL Firmada de Imagen
**GET** `/api/product/:id/image`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "imageUrl": "https://bucket-utn.s3.us-east-1.amazonaws.com/products/1234567890-123456789.jpg?X-Amz-Algorithm=..."
}
```

## Características

### ✅ **Procesamiento Automático**
- **Redimensionado:** Imágenes se redimensionan a máximo 800x600px
- **Compresión:** Calidad JPEG al 80%
- **Formato:** Todas las imágenes se convierten a JPEG
- **Tamaño máximo:** 5MB por archivo

### ✅ **Gestión de Archivos**
- **Eliminación automática:** Al actualizar, la imagen anterior se elimina
- **Nombres únicos:** Cada imagen tiene un nombre único con timestamp
- **Organización:** Imágenes se guardan en carpeta `products/`

### ✅ **Seguridad**
- **URLs firmadas:** Acceso temporal a las imágenes (1 hora por defecto)
- **Validación:** Solo archivos de imagen permitidos
- **Autenticación:** Todos los endpoints requieren JWT

## Ejemplos de Uso

### Crear Producto con cURL
```bash
curl -X POST http://localhost:3001/api/product/create \
  -H "Authorization: Bearer <token>" \
  -F "name=Laptop Gaming" \
  -F "price=1500" \
  -F "description=High performance gaming laptop" \
  -F "stock=10" \
  -F "category=ObjectId" \
  -F "image=@/path/to/image.jpg"
```

### Actualizar Producto con Nueva Imagen
```bash
curl -X PUT http://localhost:3001/api/product/update/ObjectId \
  -H "Authorization: Bearer <token>" \
  -F "name=Laptop Gaming Pro" \
  -F "price=1800" \
  -F "image=@/path/to/new-image.jpg"
```

### Obtener URL Firmada
```bash
curl -X GET http://localhost:3001/api/product/ObjectId/image \
  -H "Authorization: Bearer <token>"
```

## Códigos de Estado

- `200`: Operación exitosa
- `201`: Producto creado/actualizado exitosamente
- `404`: Producto no encontrado / No hay imagen
- `500`: Error interno del servidor

## Errores Comunes

### Error de Tamaño de Archivo
```json
{
  "message": "Error uploading image",
  "error": "File too large"
}
```

### Error de Tipo de Archivo
```json
{
  "message": "Error uploading image",
  "error": "Solo se permiten archivos de imagen"
}
```

### Error de AWS
```json
{
  "message": "Error uploading image",
  "error": "Access Denied"
}
```

## Estructura de Archivos en S3

```
bucket-utn/
└── products/
    ├── 1705320600000-123456789.jpg
    ├── 1705320601000-987654321.jpg
    └── 1705320602000-456789123.jpg
```

## Notas Importantes

1. **Imágenes opcionales:** El campo `image` es opcional en todos los endpoints
2. **URLs temporales:** Las URLs firmadas expiran en 1 hora
3. **Eliminación automática:** Al actualizar o eliminar productos, las imágenes se eliminan de S3
4. **Formato consistente:** Todas las imágenes se procesan y guardan como JPEG
5. **Validación de URL:** El modelo valida que las URLs sean de S3 válidas
