import axios from 'axios';

const BASE_URL = import.meta.env.VITE_WEBSITE_URL;

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
