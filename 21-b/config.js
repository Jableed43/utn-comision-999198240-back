import { config } from "dotenv";

config();

export const PORT = process.env.PORT || 3001;
export const MONGODB_URI = process.env.MONGODB_URI;
export const UTN_DB = process.env.UTN_DB;
export const SECRET = process.env.SECRET;