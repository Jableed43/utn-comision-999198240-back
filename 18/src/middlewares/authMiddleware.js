// Middleware para verificar autenticación
export const requireAuth = (req, res, next) => {
    if (!req.session.userId) {
        req.session.message = 'Debes iniciar sesión para acceder a esta página';
        return res.redirect('/user/login');
    }
    next();
};

// Middleware para verificar que el usuario no esté autenticado
export const requireGuest = (req, res, next) => {
    if (req.session.userId) {
        return res.redirect('/user/getAll');
    }
    next();
};
