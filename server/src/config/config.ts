import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || '3003';
export const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
export const CLOUD_NAME = process.env.CLOUD_NAME || 'cloud_name';
export const CLOUD_API_KEY = process.env.CLOUD_API_KEY || 'cloud_key';
export const CLOUD_API_SECRET = process.env.CLOUD_API_SECRET || 'cloud_secret';
