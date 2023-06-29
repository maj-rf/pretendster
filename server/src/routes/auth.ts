import { register, login, logout } from '../controllers/auth';
import express from 'express';

export const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
