import multer from 'multer';
import sharp from 'sharp';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { s3Client } from '../config/aws.js';

// Configuración de multer para memoria
const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB máximo
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Solo se permiten archivos de imagen'), false);
        }
    },
});

// Middleware para procesar y subir imagen
export const uploadProductImage = async (req, res, next) => {
    try {
        if (!req.file) {
            return next(); // No hay imagen, continuar
        }

        // Procesar imagen con Sharp
        const processedImage = await sharp(req.file.buffer)
            .resize(800, 600, { fit: 'inside', withoutEnlargement: true })
            .jpeg({ quality: 80 })
            .toBuffer();

        // Generar nombre único para el archivo
        const fileName = `products/${Date.now()}-${Math.round(Math.random() * 1E9)}.jpg`;

        // Subir a S3
        const uploadParams = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: fileName,
            Body: processedImage,
            ContentType: 'image/jpeg',
        };

        const command = new PutObjectCommand(uploadParams);
        await s3Client.send(command);

        // Agregar URL de la imagen al request
        req.imageUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
        
        next();
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ message: 'Error uploading image', error: error.message });
    }
};

export { upload };
