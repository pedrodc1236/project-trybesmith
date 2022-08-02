import { Router } from 'express';
import OrderController from '../controllers/OrderController';
import auth from '../middlewares/auth';

const router = Router();

const orderController = new OrderController();

router.get('/', orderController.getAll);

router.use(auth);

router.post('/', orderController.create);

export default router;