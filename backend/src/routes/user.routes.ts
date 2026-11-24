import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const userRoutes = Router();

userRoutes.use(authMiddleware);

userRoutes.get('/me', UserController.getMe);
userRoutes.patch('/me', UserController.updateProfile);
userRoutes.patch('/me/role', UserController.updateRole);

export { userRoutes };