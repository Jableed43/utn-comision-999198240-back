// Middleware para manejo de errores
export const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);
    
    // Error de validación
    if (err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map(e => e.message);
        req.session.message = `Error de validación: ${errors.join(', ')}`;
        return res.redirect('back');
    }
    
    // Error de duplicado
    if (err.code === 11000) {
        req.session.message = 'El registro ya existe';
        return res.redirect('back');
    }
    
    // Error de JWT
    if (err.name === 'JsonWebTokenError') {
        req.session.message = 'Token inválido';
        return res.redirect('/user/login');
    }
    
    // Error de token expirado
    if (err.name === 'TokenExpiredError') {
        req.session.message = 'Sesión expirada';
        return res.redirect('/user/login');
    }
    
    // Error genérico
    req.session.message = 'Error interno del servidor';
    res.redirect('back');
};
