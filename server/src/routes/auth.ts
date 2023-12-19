import { register, login, logout, getAuthUser } from '../controllers/auth';
import express from 'express';
import { verifyJWT } from '../middleware/middleware';

export const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.get('/session', verifyJWT, getAuthUser);
