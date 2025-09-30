# 📊 Datos de Prueba (Mock Data)

Este directorio contiene scripts para insertar datos de ejemplo en la base de datos.

## 🚀 Uso Rápido

### Insertar todos los datos:
```bash
npm run mock:all
```

### Insertar datos individuales:
```bash
npm run mock:categories  # Solo categorías
npm run mock:users       # Solo usuarios  
npm run mock:products    # Solo productos
```

## 📋 Datos Incluidos

### Categorías (5)
- Electrónicos
- Ropa
- Hogar
- Deportes
- Libros

### Usuarios (5)
- Juan Pérez (juan.perez@email.com)
- María García (maria.garcia@email.com)
- Carlos López (carlos.lopez@email.com)
- Ana Martínez (ana.martinez@email.com)
- Luis Rodríguez (luis.rodriguez@email.com)

**Contraseña para todos:** `Password123`

### Productos (8)
- Laptop HP - $899.99 (Electrónicos)
- Camiseta Nike - $29.99 (Ropa)
- Sofá 3 plazas - $599.99 (Hogar)
- Balón de Fútbol - $19.99 (Deportes)
- Libro de Programación - $49.99 (Libros)
- Smartphone Samsung - $699.99 (Electrónicos)
- Mesa de Comedor - $299.99 (Hogar)
- Zapatillas Adidas - $89.99 (Ropa)

## ⚠️ Importante

1. **Ejecutar en orden:** Categorías → Usuarios → Productos
2. **Base de datos limpia:** Los scripts eliminan datos existentes
3. **Dependencias:** Los productos requieren categorías existentes

## 🔧 Scripts Disponibles

- `categories.js` - Inserta categorías
- `users.js` - Inserta usuarios con contraseñas encriptadas
- `products.js` - Inserta productos con relaciones a categorías
- `insert-all.js` - Ejecuta todos los scripts en orden
