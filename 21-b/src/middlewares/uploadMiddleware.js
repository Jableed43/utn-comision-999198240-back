import multer from 'multer'
import sharp from 'sharp'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { s3Client } from '../config/aws'

// Configurar multer para almacenar en memoria
const storage = multer.memoryStorage()

//Configurar multer
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // Limite de 5MB
    },
    fileFilter: (req, file, cb) => {
        // Solo permitimos archivos de imagen
        if(file.mimetype.startsWith('image/')){
            cb(null, true)
        } else {
            cb(new Error('Solo se permiten archivos de imagen'), false)
        }

    }
})

// Generamos el middleware personalizado para procesar y subir la imagen
export const uploadProductImage = async(req, res, next) => {
    try {
        // Si no hay archivo en el request
        if(!req.file){
            // Continua sin hacer nada
            return next()
        }

        // Procesar la imagen con sharp
        const processedImage = await sharp(req.file.buffer).resize(800, 600, {
            fit: 'inside', //Mantiene la proporcion de la imagen
            withoutEnlargement: true, // No agranda imagenes pequeñas
        })
        .jpeg({ quality: 80 })
        .toBuffer()

        const fileName = `products/${Date.now()}-${Math.round(Math.random() * 1E9)}.jpg`
        
        // Configurar los parametros de subida a S3
        const uploadParams = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: fileName,
            Body: processedImage,
            ContentType: 'image/jpeg'
        }

        // Subir el archivo a S3
        const command = new PutObjectCommand(uploadParams)
        // Enviamos la imagen
        await s3Client.send(command)

        // Agregamos url de la imagen al request
        req.imageUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`

        next()
    } catch (error) {
        console.error("Error uploading image:", error)
        res.status(500).json({
            message: "Error uploading image",
            error: error.message
        })
    }
}

export { upload }

/* Multer recibe el archivo del formulario,
 sharp lo procesa y optimiza, aws s3 sube la imagen a la nube y
 la url de la imagen es generada de forma publica */