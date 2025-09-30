import mongoose from 'mongoose'

export const statusEnum = [ "AVAILABLE", "NOT AVAILABLE", "DISCONTINUED" ]

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        // Si el cliente no me envia el dato, le respondo con el mensaje
        required: [ true, "Name field is required" ],
        minLength: 3,
        maxLength: 50,
        unique: true,
        lowercase: true,
        trim: true
    },
    // precio de lista
    price: {
        type: Number,
        required: [ true, "Price field is required" ],
        // Minimo de precio
        min: [1, "Price field has to be a number"]
    },
    // Generamos un valor de ganancia
    profitRate: {
        type: Number,
        // +30% del valor de lista por defecto
        default: 1.30,
        min: [1, "Profit rate must be greater than or equal to 1"]
    },
    description: {
        type: String,
        minLength: 5,
        maxLength: 200,
    },
    // El status lo manejamos con un ENUM de posibles valores
    status: {
        type: String,
        // El campo validate sirve para generar una funcion de validacion para nuestro campo
            validate: {
                // Validator contiene una funcion que permite validar algo del campo
                // status es el campo
                validator: function (status) {
                    return statusEnum.includes(status)
                },
                // props es el dato que nos llegó en status
                message: props => `${props.value} it's not a valid status`
            }
    },
    // Esta seria el equivalente a FK en bases de datos noSQL
    // Ref es a que modelo se refiere, y cual modelo/collection es dueño de ese ObjectId
    category: {type: mongoose.Schema.Types.ObjectId, ref: "category" },

    stock: {
        type: Number,
        default: 0,
        min: [0, "Stock can't be a negative number"]
    },

    // Campo de destacados
    highlighted: {
        type: Boolean,
        default: false
    },
})

    // Metodos de instancia para disminuir el stock
    // amount es la cantidad "vendida" que se resta al stock
    // Este metodo queda guardado en el modelo y cuando lo necesitamos lo usamos
    // No se ejecuta automaticamente, entonces lo incluimos donde necesitamos restar stock
    productSchema.methods.decreaseStock = async function (amount) {
        if(amount <= 0){
            throw new Error("Amount has to be a positive value")
        }

        if(this.stock < amount) {
            throw new Error("Not enough quantity")
        }
        // stock = stock - amount
        this.stock -= amount
        // Se guarda en la db el nuevo valor
        await this.save()
    }

    // Atributos/propiedades virtuales, sirven para:
    // Calcular el precio con la tasa de ganancia
    // Permite generar un valor sin haberlo escrito en el esquema
    // Facilita mucho porque podemos hacer calculos con nuestros propios valores
    // Datos pre calculados
    productSchema.virtual("priceWithProfitRate").get(function () {
        return this.price * this.profitRate
    })

    // Es una configuracion para incluir las propiedades virtuales
    productSchema.set("toJSON", {virtuals: true})
    productSchema.set("toObject", {virtuals: true})

export default mongoose.model("product", productSchema) 