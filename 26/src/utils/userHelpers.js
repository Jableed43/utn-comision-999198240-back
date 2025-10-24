import User from "../models/userModel.js";

export const findUserByIdAndCheck = async (userId) => {
    const userExist = await User.findOne({ _id: userId })
    
        if(!userExist){
            const error = new Error("User not found")
            error.statusCode = 404
            throw error
        }
    return userExist
}