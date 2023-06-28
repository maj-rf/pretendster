import { register, getUsers, getRandom } from '../controllers/auth';
import express from 'express';
import { verifyJWT } from '../middleware/middleware';

export const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.get('/all_users', getUsers);
authRouter.get('/random', verifyJWT, getRandom);
