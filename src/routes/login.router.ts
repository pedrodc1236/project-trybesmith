import { Router } from 'express';
import LoginController from '../controllers/LoginController';
import middlewareLogin from '../middlewares/loginMiddleware';

const router = Router();

const loginController = new LoginController();

router.use(middlewareLogin);

router.post('/', loginController.login);

export default router;
