import { verifyToken } from '../utils/verifyToken.js'
// Este middleware es pre controlador
// Es previo al controlador

export const verifyTokenMiddleware = (req, res, next) => {
    try {
        // Leer el token desde el request
        const authHeader = req.headers.authorization;
        console.log(authHeader)

        // Si no hay token o el token empieza con bearer, esta conficion falla
        if(!authHeader || !authHeader.startsWith("Bearer")){
            return res.status(400).json({ message: "Token de acceso no proporcionado" })
        }

        // Separamos "bearer" del resto del token y tomamos solo el token
        // "Bearer jdajskl89430432"
        const token = authHeader.split(" ")[1]

        // Decodificamos
        // El mismo sistema que firmo el token es quien puede verificar si es valido o no
        const decoded = verifyToken(token)

        console.log({decoded})

        // Guardamos en el request del usuario el token
        req.user = decoded

        // Si salio todo bien pasamos al proximo paso
        next()
           
    } catch (error) {
        return res.status(400).json({ message: "Token de acceso invalido", error: error.message })
    }
}