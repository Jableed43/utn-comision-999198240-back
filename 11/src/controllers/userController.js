import User from "../models/userModel.js"

// Controladores: Actuan como intermediario entre cliente y la logica de la aplicacion. Recibe solicitudes las procesa y responde
// Estos controladores incluyen a los servicios

// CRUD

// Crear usuario
export const createUser = async (req, res) => {
    try {
        // Tomar datos del request enviado por POST
        // Llegan x body
        // Creamos nuestro nuevo usuario
        const userData = new User(req.body)

        // Validacion
        // Destructuramos
        const { email } = userData
        const userExist = await User.findOne({email})
        if(userExist){
            return res
            .status(400)
            .json({ message: `User with ${email} aready exists` })
        }

        //Guardamos el usuario en la db
        await userData.save()
        res.status(201).json({ message: "User created" })
        
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error })
    }
}