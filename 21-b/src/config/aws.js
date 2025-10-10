import { S3Client } from '@aws-sdk/client-s3'
import config from 'dotenv'

// Crear el cliente s3 con las credenciales de nuestro env
config()

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
})

export { s3Client }