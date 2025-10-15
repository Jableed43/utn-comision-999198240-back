import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [ true, "Name field is required" ],
        minLength: 3,
        maxLength: 20,
        lowercase: true,
        trim: true
    },
    lastName: {
        type: String,
        required: [ true, "Lastname field is required" ],
        minLength: 3,
        maxLength: 20,
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        required: [ true, "Email field is required" ], 
        maxLength: 50,
        trim: true,
        lowercase: true,
        match: /^\S+@\S+\.\S+$/, 
        unique: true,
    },
    password: {
        required: [ true, "Password field is required" ],
        type: String
    }
    
}, 
    {timeStamps: true}
)

export default mongoose.model("user", userSchema)