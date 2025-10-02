# Configuración de Variables de Entorno

## Configuración Inicial

1. **Copia el archivo de plantilla:**
   ```bash
   cp env.txt .env
   ```

2. **Edita el archivo `.env` con tus valores:**
   ```env
   VITE_API_BASE_URL=http://localhost:3000/api
   ```

## Variables Disponibles

### `VITE_API_BASE_URL`
- **Descripción**: URL base de la API del backend
- **Valor por defecto**: `http://localhost:3000/api`
- **Ejemplo**: `http://localhost:3000/api`

## Estructura de la API

La configuración de la API está centralizada en `src/config/api.js`:

- **Usuarios**: `/user/*`
- **Productos**: `/product/*`
- **Categorías**: `/category/*`

## Uso en el Código

Los hooks automáticamente usan la configuración centralizada:

```javascript
import { buildApiUrl, API_CONFIG } from '../config/api.js';

// Construir URL completa
const url = buildApiUrl(API_CONFIG.USER.CREATE);
// Resultado: http://localhost:3000/api/user/create
```

## Cambios de Entorno

Para cambiar entre diferentes entornos (desarrollo, producción), solo necesitas modificar el archivo `.env`:

```env
# Desarrollo
VITE_API_BASE_URL=http://localhost:3000/api

# Producción
VITE_API_BASE_URL=https://mi-api.com/api
```

## Notas Importantes

- Las variables de entorno en Vite deben empezar con `VITE_`
- Después de cambiar el `.env`, reinicia el servidor de desarrollo
- El archivo `.env` no debe subirse al repositorio (está en `.gitignore`)

