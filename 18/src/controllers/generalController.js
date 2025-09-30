// ===== CONTROLADOR GENERAL =====
// Este archivo maneja las vistas generales del sistema

// Vista de la página de inicio
export const homeView = (req, res) => {
    // Renderizamos la página de inicio
    res.render("home", { 
        title: "Sistema de Gestión",
        message: req.session.message || null
    })
}