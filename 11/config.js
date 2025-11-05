import { config } from "dotenv";

config();

export const PORT = process.env.PORT || 3001;
export const MONGODB_URI = process.env.MONGODB_URI;
export const UTN_DB = process.env.UTN_DB;
export const SECRET = process.env.SECRET;

export const EMAIL_PORT= process.env.EMAIL_PORT;
export const EMAIL_HOST= process.env.EMAIL_HOST;
export const EMAIL_USER= process.env.EMAIL_USER;
export const EMAIL_PASS= process.env.EMAIL_PASS;