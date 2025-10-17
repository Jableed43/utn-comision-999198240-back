import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, 
        unique: true,
        trim: true,
        lowercase: true,
        maxLength: 30,
        minLength: 2
    },
    description: {
        type: String,
        trim: true,
        lowercase: true,
        maxLength: 200,
        required: false
    }
}, {
    timestamps: true
})

export default mongoose.model("category", categorySchema)