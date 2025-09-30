// ===== HELPERS DE HANDLEBARS =====
// Los helpers son funciones que extienden las capacidades de Handlebars
// Nos permiten hacer operaciones lógicas y de formato dentro de los templates

export const registerHelpers = (Handlebars) => {
    
    // ===== HELPERS ESENCIALES (Solo los que realmente usamos) =====
    
    // Helper para comparar valores - ESENCIAL para formularios
    // ¿Qué hace? Compara si dos valores son iguales
    // ¿Por qué lo necesitamos? Para marcar opciones como "selected" en formularios
    // Uso: {{#if (eq status "AVAILABLE")}}Disponible{{/if}}
    Handlebars.registerHelper('eq', function (a, b) {
        return a === b;
    });

    // Helper para convertir valores a string - ESENCIAL para comparar IDs
    // ¿Qué hace? Convierte cualquier valor (especialmente ObjectId de MongoDB) a string
    // ¿Por qué lo necesitamos? Los ObjectId de MongoDB no se pueden comparar directamente
    // Uso: {{#if (eq (toString _id) (toString ../product.category._id))}}selected{{/if}}
    Handlebars.registerHelper('toString', function (value) {
        return value ? value.toString() : '';
    });

    // Helper para lógica AND - ÚTIL para condiciones múltiples
    // ¿Qué hace? Evalúa si dos condiciones son verdaderas al mismo tiempo
    // ¿Por qué lo necesitamos? Para mostrar contenido solo si se cumplen varias condiciones
    // Uso: {{#if (and user.isActive user.hasPermission)}}Acceso permitido{{/if}}
    Handlebars.registerHelper('and', function (a, b) {
        return a && b;
    });
}