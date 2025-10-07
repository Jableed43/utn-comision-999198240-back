import { DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { s3Client } from '../config/aws.js';

// Eliminar imagen de S3
export const deleteImageFromS3 = async (imageUrl) => {
    try {
        if (!imageUrl) return;

        // Extraer el key del URL
        const urlParts = imageUrl.split('/');
        const key = urlParts.slice(3).join('/'); // Remover https://bucket.s3.region.amazonaws.com/

        const deleteParams = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: key,
        };

        const command = new DeleteObjectCommand(deleteParams);
        await s3Client.send(command);
        
        console.log('Image deleted from S3:', key);
    } catch (error) {
        console.error('Error deleting image from S3:', error);
        throw error;
    }
};

// Generar URL firmada para acceso temporal
export const generateSignedUrl = async (imageUrl, expiresIn = 3600) => {
    try {
        if (!imageUrl) return null;

        // Extraer el key del URL
        const urlParts = imageUrl.split('/');
        const key = urlParts.slice(3).join('/');

        const command = new GetObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: key,
        });

        return await getSignedUrl(s3Client, command, { expiresIn });
    } catch (error) {
        console.error('Error generating signed URL:', error);
        return null;
    }
};
