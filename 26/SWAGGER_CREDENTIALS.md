# 🔐 Credenciales de Swagger API Documentation

## Acceso a la Documentación

**URL:** `http://localhost:3000/api-docs`

## Credenciales Disponibles

### 👨‍💼 Administrador
- **Usuario:** `admin`
- **Contraseña:** `swagger123`
- **Acceso:** Completo a la documentación

### 👨‍💻 Desarrollador
- **Usuario:** `dev`
- **Contraseña:** `dev123`
- **Acceso:** Documentación para desarrollo

### 📚 Documentación
- **Usuario:** `api-docs`
- **Contraseña:** `docs2024`
- **Acceso:** Solo lectura de documentación

## 🔒 Seguridad

- ✅ **Autenticación básica** implementada
- ✅ **Múltiples usuarios** con diferentes niveles de acceso
- ✅ **Protección** contra acceso no autorizado
- ✅ **Realm personalizado** para identificación

## 📝 Notas Importantes

1. **Cambiar contraseñas** en producción
2. **Usar HTTPS** para proteger las credenciales
3. **No compartir** estas credenciales públicamente
4. **Monitorear** los accesos a la documentación

## 🚀 Uso en Producción

Para mayor seguridad en producción, considera:

1. **Variables de entorno** para las credenciales
2. **Restricción por IP** si es posible
3. **Rate limiting** para prevenir abuso
4. **Deshabilitar** en producción si no es necesario

## 📋 Ejemplo de Variables de Entorno

```env
# Swagger Security
SWAGGER_USER=admin
SWAGGER_PASSWORD=your_secure_password_here
SWAGGER_ENABLED=true
```

---

**⚠️ IMPORTANTE:** Estas credenciales son para desarrollo. Cambiar en producción.
