import { Router } from 'express';
import UserController from '../controllers/UserController';
import middlewareUser from '../middlewares/userMiddleware';

const router = Router();

const userController = new UserController();

router.use(middlewareUser);

router.post('/', userController.create);

export default router;