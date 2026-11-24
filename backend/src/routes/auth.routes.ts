import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

const authRoutes = Router();

authRoutes.post('/signup', AuthController.signUp);
authRoutes.post('/login', AuthController.login);
authRoutes.post('/forgot-password', AuthController.forgotPassword);
authRoutes.post('/reset-password', AuthController.resetPassword);

export { authRoutes };