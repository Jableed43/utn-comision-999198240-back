import User from '../models/userModel.js'

// Create
export const createUserService = async (userData) => {
    // Validamos si ya existe el usuario
    const userExists = await User.findOne({ email: userData.email })

    if(userExists){
        throw new Error("User with this email already exists")
    }

    const newUser = new User(userData)

    await newUser.save()

    return { message: "User created", user: newUser }
}

// Get
export const getUsersService = async () => {
    const users = await User.find()

    // Validacion por si no hay usuarios
    if(users.length === 0){
        const error = new Error("There are no users")
        error.statusCode = 204 // No content
        throw error
    }
    return users
}

// Get By ID
export const getUserByIdService = async (userId) => {

    const user = await User.findById({_id: userId})

    // Validacion por si no hay usuarios
    if(!user){
        const error = new Error(`There is no user with ${userId} id`)
        error.statusCode = 204 // No content
        throw error
    }
    return user
}

// Delete
export const deleteUserService = async (userId) => {
    // Validar si existe
    const userExists = await User.findOne({ _id: userId })

    if(!userExists){
        const error = new Error("User doesn't exist")
        error.statusCode = 404
        throw error
    }

    await User.findByIdAndDelete({ _id: userId})

    return { message: "User deleted successfully" }
}


// Update
export const updateUserService = async (userId, updateData) => {
    const userExists = await User.findOne({ _id: userId })

    if(!userExists){
        const error = new Error("User doesn't exist")
        error.statusCode = 404
        throw error
    }

    const updatedUser = await User.findByIdAndUpdate({ _id: userId }, updateData, { new: true })

    return updatedUser;
}