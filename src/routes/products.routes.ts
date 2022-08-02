import { Router } from 'express';
import ProductController from '../controllers/ProductController';
import middlewareProduct from '../middlewares/productMiddleware';

const router = Router();

const productController = new ProductController();

router.get('/', productController.getAll);

router.use(middlewareProduct);

router.post('/', productController.create);

export default router;