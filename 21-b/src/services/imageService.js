import { DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { s3Client } from "../config/aws.js"


// Servicio para eliminar la imagen de s3
export const deleteImageFromS3 = async (imageUrl) => {
    try {
        if(!imageUrl) {
            return null
        }

        // Si tenemos imagen
        const urlParts = imageUrl.split("/")
        const key = urlParts.slice(3).join("/")
        // removemos https://bucket-utn.s3.us-east-1.amazonaws.com/

        const deleteParams = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: key,
        }

        // Comando de eliminacion de objetos
        const command = new DeleteObjectCommand(deleteParams)
        await s3Client.send(command)
        console.log("Image deleted from S3: ", key)
    } catch (error) {
        console.error("Error deleting image from S3: ", error)
        throw error
    }
}


// Servicio para firmar el acceso

export const generateSignedUrl = async (imageUrl, expiresIn = 3600) => {
    try {
        if(!imageUrl) {
            return null
        }
        const urlParts = imageUrl.split("/")
        const key = urlParts.slice(3).join("/")
        // removemos https://bucket-utn.s3.us-east-1.amazonaws.com/

        const command = new GetObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: key,
        })

       return await getSignedUrl(s3Client, command, { expiresIn })
        
    } catch (error) {
        console.error("Error generating signed url: ", error)
        return null;
    }
}