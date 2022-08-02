import express from 'express';
import ProductsRoutes from './routes/products.routes';
import UsersRoutes from './routes/users.router';
import OrdersRoutes from './routes/orders.router';

const app = express();

app.use(express.json());

app.use('/products', ProductsRoutes);
app.use('/users', UsersRoutes);
app.use('/orders', OrdersRoutes);

export default app;
