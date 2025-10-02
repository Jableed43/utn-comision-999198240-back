// Configuración de la API
export const API_CONFIG = {
    BASE_URL: import.meta.env.VITE_API_BASE_URL,
    
    // Endpoints de usuarios
    USER: {
        CREATE: '/user/create',
        GET_ALL: '/user/getUsers',
        UPDATE: '/user/updateUser',
        DELETE: '/user/deleteUser',
        LOGIN: '/user/login'
    },
    
    // Endpoints de productos
    PRODUCT: {
        GET_ALL: '/product',
        CREATE: '/product/create',
        UPDATE: '/product/update',
        DELETE: '/product/delete',
        FIND_BY_ID: '/product/find-by-id',
        FIND_BY_NAME: '/product/name',
        STATUS: '/product/status'
    },
    
    // Endpoints de categorías
    CATEGORY: {
        GET_ALL: '/category/getCategories',
        CREATE: '/category/create',
        DELETE: '/category/delete'
    }
};

// Función helper para construir URLs completas
export const buildApiUrl = (endpoint) => {
    return `${API_CONFIG.BASE_URL}${endpoint}`;
};

