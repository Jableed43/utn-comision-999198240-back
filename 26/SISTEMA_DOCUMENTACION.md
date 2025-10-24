# Sistema de Gestión de Productos y Usuarios

## Objetivo del Sistema

Sistema de gestión empresarial que permite administrar usuarios, categorías y productos con autenticación JWT, validaciones robustas y arquitectura en capas. Diseñado para facilitar la gestión de inventario y usuarios en un entorno empresarial.

## Tecnologías Utilizadas

- **Backend**: Node.js con Express.js
- **Base de Datos**: MongoDB con Mongoose ODM
- **Autenticación**: JWT (JSON Web Tokens) con bcrypt
- **Validaciones**: Mongoose Schema validations
- **Arquitectura**: MVC (Model-View-Controller) con capa de servicios
- **Seguridad**: Encriptación de contraseñas, middleware de autenticación
- **Comunicación**: CORS habilitado para frontend

## Arquitectura del Sistema

### Estructura de Capas
1. **Rutas** (`/routes`): Definición de endpoints
2. **Controladores** (`/controllers`): Lógica de manejo de requests
3. **Servicios** (`/services`): Lógica de negocio
4. **Modelos** (`/models`): Esquemas de base de datos
5. **Utilidades** (`/utils`): Funciones auxiliares
6. **Middleware** (`/middlewares`): Autenticación y validaciones

## Modelos de Datos

### User Model
**Colección**: `users`
**Campos**:
- `name`: String (2-20 chars, required, lowercase, trim)
- `lastName`: String (2-20 chars, required, lowercase, trim)
- `email`: String (6-30 chars, required, unique, lowercase, email format)
- `age`: Number (16-110, required)
- `password`: String (validated with regex, encrypted with bcrypt)
- `createdAt`: Timestamp automático
- `updatedAt`: Timestamp automático

**Características**:
- Encriptación automática de contraseñas con bcrypt (salt rounds: 10)
- Validación de contraseña: 6-12 caracteres, al menos 1 número, 1 mayúscula, 1 minúscula
- Email único y formato válido
- Timestamps automáticos para auditoría

### Category Model
**Colección**: `categories`
**Campos**:
- `name`: String (2-30 chars, required, unique, lowercase, trim)
- `createdAt`: Timestamp automático
- `updatedAt`: Timestamp automático

**Características**:
- Nombre único para evitar duplicados
- Referenciado por productos como Foreign Key
- Validaciones de longitud mínima y máxima

### Product Model
**Colección**: `products`
**Campos**:
- `name`: String (3-50 chars, required, unique, lowercase, trim)
- `price`: Number (min: 1, required)
- `profitRate`: Number (default: 1.30, min: 1)
- `description`: String (5-200 chars, optional)
- `status`: String (enum: "AVAILABLE", "NOT AVAILABLE", "DISCONTINUED")
- `category`: ObjectId (ref: "category")
- `stock`: Number (default: 0, min: 0)
- `highlighted`: Boolean (default: false)
- `createdAt`: Timestamp automático
- `updatedAt`: Timestamp automático

**Características Especiales**:
- **Propiedad Virtual**: `priceWithProfitRate` - Calcula precio con ganancia automáticamente
- **Método de Instancia**: `decreaseStock(amount)` - Disminuye stock con validaciones
- **Validaciones de Estado**: Solo acepta valores del enum definido
- **Referencia a Categoría**: Relación con modelo Category
- **Control de Stock**: Validación de cantidades positivas y disponibilidad

**Métodos Personalizados**:
```javascript
// Disminuir stock con validaciones
product.decreaseStock(amount) // Valida cantidad positiva y stock disponible
```

**Propiedades Virtuales**:
```javascript
// Precio con tasa de ganancia aplicada
product.priceWithProfitRate // Retorna: price * profitRate
```

## Funcionalidades Principales

### Gestión de Usuarios
- **Registro**: Creación de usuarios con validaciones estrictas
- **Autenticación**: Login con JWT y encriptación bcrypt
- **CRUD Completo**: Crear, leer, actualizar y eliminar usuarios
- **Validaciones**: Email único, contraseñas seguras, edad mínima

### Gestión de Categorías
- **CRUD Básico**: Crear, listar y eliminar categorías
- **Validaciones**: Nombres únicos, longitud mínima/máxima
- **Relación**: Referencia desde productos

### Gestión de Productos
- **CRUD Completo**: Todas las operaciones CRUD
- **Búsquedas**: Por nombre (parcial) y por ID
- **Estados**: Sistema de estados (AVAILABLE, NOT AVAILABLE, DISCONTINUED)
- **Stock**: Control de inventario con método de disminución
- **Precios**: Cálculo automático con tasa de ganancia
- **Relaciones**: Vinculación con categorías

## Flujos de Trabajo

### Autenticación
1. Usuario envía credenciales → `POST /api/user/login`
2. Sistema valida email y contraseña
3. Genera JWT token con expiración de 1 hora
4. Retorna token para autenticación posterior

### Gestión de Productos
1. **Creación**: Validación de datos → Guardado en BD → Respuesta
2. **Búsqueda**: Filtros por nombre/ID → Retorno de resultados
3. **Actualización**: Validación de existencia → Modificación → Confirmación
4. **Eliminación**: Verificación de existencia → Eliminación → Confirmación

### Gestión de Stock
1. Verificación de cantidad disponible
2. Disminución automática del stock
3. Validación de valores positivos
4. Actualización en tiempo real

## Validaciones Implementadas

### Usuarios
- **Email**: Formato válido, único, longitud 6-30 caracteres
- **Contraseña**: 6-12 caracteres, al menos 1 número, 1 mayúscula, 1 minúscula
- **Nombre/Apellido**: 2-20 caracteres, obligatorios
- **Edad**: 16-110 años, numérico

### Productos
- **Nombre**: 3-50 caracteres, único, obligatorio
- **Precio**: Mínimo 1, numérico, obligatorio
- **Descripción**: 5-200 caracteres, opcional
- **Stock**: Mínimo 0, numérico
- **Estado**: Valores del enum definido
- **Categoría**: Referencia válida a categoría existente

### Categorías
- **Nombre**: 2-30 caracteres, único, obligatorio

## Endpoints Disponibles

### Usuarios (`/api/user`)
- `POST /create` - Crear usuario
- `GET /getUsers` - Listar usuarios
- `DELETE /deleteUser/:id` - Eliminar usuario
- `PATCH /updateUser/:id` - Actualizar usuario
- `POST /login` - Autenticación

### Categorías (`/api/category`)
- `POST /create` - Crear categoría
- `GET /getCategories` - Listar categorías
- `DELETE /delete/:id` - Eliminar categoría

### Productos (`/api/product`)
- `GET /` - Listar productos
- `POST /create` - Crear producto
- `POST /name` - Buscar por nombre
- `GET /find-by-id/:id` - Buscar por ID
- `PUT /update/:id` - Actualizar producto
- `DELETE /delete/:id` - Eliminar producto
- `GET /status` - Obtener estados disponibles

## Características Técnicas

### Seguridad
- Encriptación automática de contraseñas con bcrypt
- Autenticación JWT con expiración
- Middleware de verificación de tokens
- Validaciones de entrada robustas

### Base de Datos
- Esquemas con validaciones a nivel de modelo
- Timestamps automáticos (createdAt, updatedAt)
- Referencias entre colecciones
- Métodos de instancia personalizados

### Manejo de Errores
- Códigos de estado HTTP apropiados
- Mensajes de error descriptivos
- Validación de existencia antes de operaciones
- Manejo centralizado de errores

### Optimizaciones
- Búsquedas con regex insensible a mayúsculas
- Población de referencias (populate)
- Validaciones a nivel de base de datos
- Cálculos automáticos con propiedades virtuales

## Configuración del Sistema

### Variables de Entorno
- `PORT`: Puerto del servidor (default: 3001)
- `MONGODB_URI`: URI de conexión a MongoDB
- `UTN_DB`: Nombre de la base de datos
- `SECRET`: Clave secreta para JWT

### Dependencias Principales
- Express.js para el servidor web
- Mongoose para ODM de MongoDB
- JWT para autenticación
- bcrypt para encriptación
- CORS para comunicación con frontend
- body-parser para parsing de requests
- express-session para manejo de sesiones
