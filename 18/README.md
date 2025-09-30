# 🚀 Sistema de Gestión CRUD con Handlebars

## 📋 **Descripción del Proyecto**

Este es un sistema CRUD completo desarrollado con **Node.js**, **Express.js**, **MongoDB** y **Handlebars**. Implementa el patrón **MVC (Model-View-Controller)** para gestionar usuarios, categorías y productos con una interfaz web simple y funcional.

## 🏗️ **Arquitectura del Proyecto**

### **Patrón MVC Implementado**
```
src/
├── models/          # 📊 Capa de Datos (Model)
│   ├── userModel.js
│   ├── productModel.js
│   └── categoryModel.js
├── views/           # 🎨 Capa de Presentación (View)
│   ├── layouts/
│   ├── user/
│   ├── category/
│   └── product/
├── controllers/     # 🎮 Capa de Lógica (Controller)
│   ├── userController.js
│   ├── productController.js
│   └── categoryController.js
├── routes/          # 🛣️ Enrutamiento
├── services/        # 🔧 Lógica de Negocio
└── public/          # 📁 Archivos Estáticos
```

## 🚀 **Tecnologías Utilizadas**

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Node.js** | - | Runtime de JavaScript |
| **Express.js** | 5.1.0 | Framework web |
| **MongoDB** | - | Base de datos NoSQL |
| **Mongoose** | 8.18.0 | ODM para MongoDB |
| **Handlebars** | 8.0.1 | Motor de plantillas |
| **JWT** | 9.0.2 | Autenticación |
| **bcrypt** | 6.0.0 | Encriptación de contraseñas |
| **express-session** | 1.18.2 | Manejo de sesiones |

## 📦 **Instalación y Configuración**

### **1. Instalar Dependencias**
```bash
npm install
```

### **2. Configurar Variables de Entorno**
Crear archivo `.env` en la raíz del proyecto:
```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017
UTN_DB=utn_database
SECRET=tu_secreto_jwt_muy_seguro_aqui_123456789
```

### **3. Ejecutar el Proyecto**
```bash
# Desarrollo
npm run dev

# Producción
npm start
```

## 🗄️ **Modelos de Datos**

### **User Model**
- `name`: String (2-20 chars, lowercase)
- `lastName`: String (2-20 chars, lowercase)
- `email`: String (único, validación regex)
- `age`: Number (16-110)
- `password`: String (validación regex, encriptada con bcrypt)

### **Category Model**
- `name`: String (único, lowercase)

### **Product Model**
- `name`: String (único, lowercase)
- `price`: Number (min: 1)
- `profitRate`: Number (default: 1.30)
- `description`: String (opcional)
- `status`: Enum ["AVAILABLE", "NOT AVAILABLE", "DISCONTINUED"]
- `category`: ObjectId (referencia a Category)
- `stock`: Number (default: 0)
- `highlighted`: Boolean (default: false)

## 🛣️ **Rutas y Endpoints**

### **Usuarios (`/user`)**
- `GET /create` - Vista de registro
- `POST /create` - Crear usuario
- `GET /login` - Vista de login
- `POST /login` - Autenticación
- `GET /getAll` - Listar usuarios
- `GET /update/:id` - Vista de edición
- `PUT /update/:id` - Actualizar usuario
- `DELETE /delete/:id` - Eliminar usuario
- `GET /logout` - Cerrar sesión

### **Categorías (`/category`)**
- `GET /create` - Vista de creación
- `POST /create` - Crear categoría
- `GET /getAll` - Listar categorías
- `DELETE /delete/:id` - Eliminar categoría

### **Productos (`/product`)**
- `GET /create` - Vista de creación
- `POST /create` - Crear producto
- `GET /getAll` - Listar productos
- `GET /update/:id` - Vista de edición
- `PUT /update/:id` - Actualizar producto
- `DELETE /delete/:id` - Eliminar producto

## 🎨 **Sistema de Vistas (Handlebars)**

### **Layout Principal**
- **Navegación** con enlaces a todas las secciones
- **Mensajes** de feedback al usuario
- **Diseño responsive** y moderno
- **Estilos CSS** integrados

### **Vistas Implementadas**
- **Home**: Página de inicio con información del sistema
- **Usuarios**: CRUD completo con autenticación
- **Categorías**: Gestión simple de categorías
- **Productos**: CRUD completo con relaciones

## 🔐 **Sistema de Autenticación**

### **Flujo de Autenticación**
1. **Registro**: Usuario se registra con validaciones
2. **Login**: Validación de credenciales con bcrypt
3. **JWT**: Generación de token con expiración
4. **Sesión**: Almacenamiento del token en express-session
5. **Middleware**: Verificación de token en rutas protegidas

## 🚀 **Características Principales**

### **✅ Funcionalidades Implementadas**
- **CRUD completo** para usuarios, categorías y productos
- **Autenticación JWT** con sesiones
- **Validaciones robustas** de datos
- **Relaciones entre entidades** (Product-Category)
- **Manejo de errores** centralizado
- **Diseño responsive** y atractivo
- **Mensajes de feedback** al usuario

### **🔧 Características Técnicas**
- **Arquitectura MVC** bien estructurada
- **Separación de responsabilidades**
- **Código reutilizable** y mantenible
- **Validaciones en múltiples capas**
- **Encriptación de contraseñas**
- **Manejo de sesiones** seguro

## 📁 **Estructura de Archivos**

```
18/
├── src/
│   ├── controllers/
│   │   ├── userController.js
│   │   ├── categoryController.js
│   │   ├── productController.js
│   │   └── generalController.js
│   ├── models/
│   │   ├── userModel.js
│   │   ├── categoryModel.js
│   │   └── productModel.js
│   ├── services/
│   │   ├── userService.js
│   │   ├── categoryService.js
│   │   └── productService.js
│   ├── routes/
│   │   ├── userRoute.js
│   │   ├── categoryRoute.js
│   │   └── productRoute.js
│   ├── views/
│   │   ├── layouts/
│   │   │   └── main.handlebars
│   │   ├── user/
│   │   │   ├── createUser.handlebars
│   │   │   ├── login.handlebars
│   │   │   ├── getAllUsers.handlebars
│   │   │   └── updateUser.handlebars
│   │   ├── category/
│   │   │   ├── createCategory.handlebars
│   │   │   └── getAllCategories.handlebars
│   │   ├── product/
│   │   │   ├── createProduct.handlebars
│   │   │   ├── getAllProducts.handlebars
│   │   │   └── updateProduct.handlebars
│   │   └── home.handlebars
│   └── public/
│       └── css/
│           └── style.css
├── index.js
├── package.json
└── README.md
```

## 🎯 **Cómo Usar el Sistema**

### **1. Acceder al Sistema**
- Navegar a `http://localhost:3001`
- Ver la página de inicio con información del sistema

### **2. Gestionar Usuarios**
- **Registrarse**: `/user/create`
- **Iniciar Sesión**: `/user/login`
- **Ver Usuarios**: `/user/getAll`
- **Editar Usuario**: `/user/update/:id`

### **3. Gestionar Categorías**
- **Crear Categoría**: `/category/create`
- **Ver Categorías**: `/category/getAll`

### **4. Gestionar Productos**
- **Crear Producto**: `/product/create`
- **Ver Productos**: `/product/getAll`
- **Editar Producto**: `/product/update/:id`

## 🔧 **Configuración del Servidor**

### **Middlewares Configurados**
```javascript
app.use(methodOverride("_method"));           // HTTP method override
app.use(express.static('public'));             // Archivos estáticos
app.use(bodyParser.json());                    // Parse JSON
app.use(bodyParser.urlencoded({extended: true})); // Parse URL-encoded
app.use(session({...}));                       // Session management
```

### **Template Engine**
```javascript
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");
```

## 📈 **Mejoras Futuras Sugeridas**

### **Seguridad**
- [ ] Variables de entorno para secretos
- [ ] Rate limiting
- [ ] Validación de entrada más robusta
- [ ] HTTPS en producción

### **UI/UX**
- [ ] Navegación mejorada
- [ ] Feedback visual más detallado
- [ ] Búsqueda y filtros
- [ ] Paginación en listados

### **Funcionalidad**
- [ ] Exportación de datos
- [ ] Logs de auditoría
- [ ] Notificaciones en tiempo real
- [ ] API REST adicional

## 🎓 **Conceptos Aplicados**

### **Patrón MVC**
- **Model**: Esquemas de Mongoose
- **View**: Templates de Handlebars
- **Controller**: Lógica de negocio

### **Principios SOLID**
- **Single Responsibility**: Cada archivo tiene una responsabilidad
- **Open/Closed**: Extensible sin modificar código existente
- **Dependency Inversion**: Uso de inyección de dependencias

### **Buenas Prácticas**
- **Separación de responsabilidades**
- **Manejo centralizado de errores**
- **Validaciones en múltiples capas**
- **Código reutilizable y mantenible**

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
cp env.example .env

# Iniciar en producción
npm start

# Iniciar en desarrollo
npm run dev
```

---

## 📞 **Soporte**

Para dudas o problemas con el proyecto:
1. **Revisar logs** del servidor en consola
2. **Verificar variables** de entorno configuradas
3. **Comprobar conexión** a MongoDB
4. **Confirmar dependencias** instaladas correctamente

**¡Sistema CRUD completo y funcional!** 🚀

---

**Desarrollado con ❤️ usando Node.js, Express.js, MongoDB y Handlebars**
