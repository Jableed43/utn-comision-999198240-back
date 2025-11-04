import { config } from "dotenv";

config();

export const PORT = process.env.PORT || 3001;
export const MONGODB_URI = process.env.MONGODB_URI;
export const UTN_DB = process.env.UTN_DB;
export const SECRET = process.env.SECRET;

// Configuración de Email (Nodemailer)
export const EMAIL_HOST = process.env.EMAIL_HOST || "smtp.gmail.com";
export const EMAIL_PORT = parseInt(process.env.EMAIL_PORT) || 587;
export const EMAIL_USER = process.env.EMAIL_USER || "";
export const EMAIL_PASS = process.env.EMAIL_PASS || "";
export const EMAIL_FROM = process.env.EMAIL_FROM || process.env.EMAIL_USER || "";