import axios from 'axios';

const BASE_URL = '/api/v1';

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
