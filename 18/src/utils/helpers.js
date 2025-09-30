// Helpers para Handlebars
export const registerHelpers = (Handlebars) => {
    // Helper para comparaciones
    Handlebars.registerHelper('eq', function (a, b) {
        return a === b;
    });

    // Helper para convertir a string
    Handlebars.registerHelper('toString', function (value) {
        return value ? value.toString() : '';
    });

    // Helper para lógica AND
    Handlebars.registerHelper('and', function (a, b) {
        return a && b;
    });

    // Helper para comparaciones mayores que
    Handlebars.registerHelper('gt', function (a, b) {
        return a > b;
    });

    // Helper para formatear fechas
    Handlebars.registerHelper('formatDate', function (date) {
        if (!date) return '';
        return new Date(date).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    });

    // Helper para formatear fechas con hora
    Handlebars.registerHelper('formatDateTime', function (date) {
        if (!date) return '';
        return new Date(date).toLocaleString('es-ES', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    });

    // Helper para formatear precios
    Handlebars.registerHelper('formatPrice', function (price) {
        if (!price) return '$0.00';
        return `$${parseFloat(price).toFixed(2)}`;
    });

    // Helper para capitalizar texto
    Handlebars.registerHelper('capitalize', function (text) {
        if (!text) return '';
        return text.charAt(0).toUpperCase() + text.slice(1);
    });

    // Helper para truncar texto
    Handlebars.registerHelper('truncate', function (text, length) {
        if (!text) return '';
        if (text.length <= length) return text;
        return text.substring(0, length) + '...';
    });

    // Helper para generar IDs únicos
    Handlebars.registerHelper('uniqueId', function () {
        return 'id_' + Math.random().toString(36).substr(2, 9);
    });

    // Helper para operaciones matemáticas
    Handlebars.registerHelper('add', function (a, b) {
        return a + b;
    });

    Handlebars.registerHelper('subtract', function (a, b) {
        return a - b;
    });

    Handlebars.registerHelper('multiply', function (a, b) {
        return a * b;
    });

    Handlebars.registerHelper('divide', function (a, b) {
        return a / b;
    });
};
