import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        maxlength: 30,
        minlength: 2
    }
}, {
    // Cuando se cree y cuando se modifique se guardaran en los campos createdAt, updatedAt
    timestamps: true} )
// El nombre del modelo "category" es el que vamos a utilizar para el ref de productos
export default mongoose.model("category", categorySchema)