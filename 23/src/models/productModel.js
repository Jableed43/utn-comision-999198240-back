import mongoose from 'mongoose'
import {statusEnum} from "../enums/productEnum.js"

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name field is required"],
        minLength: 3,
        maxLength: 50,
        unique: true,
        lowercase: true,
        trim: true
    },
    price: {
        type: Number,
        required: [true, "Price field is required"],
        min: [0, "Price field has to be a number"],
    },
    description: {
        type: String,
        required: false,
        maxLength: 300
    },
    highlighted: {
        type: Boolean,
        default: false,
        required: false
    },
    status: {
        type: String,
        validate: {
            validator: (status) => statusEnum.includes(status),
            message: props => `${props.value} it's not a valid status`
            }
        }
})

export default mongoose.model("product", productSchema)