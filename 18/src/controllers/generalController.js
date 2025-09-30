export const homeView = (req, res) => {
    res.render("home", { 
        title: "Sistema de Gestión",
        message: req.session.message || null
    })
}