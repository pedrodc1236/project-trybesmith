import { Request, Response } from 'express';
import OrderService from '../services/OrderService';

class OrderController {
  constructor(private orderService = new OrderService()) { }

  public getAll = async (_req: Request, res: Response) => {
    const { code, orders } = await this.orderService.getAll();
    return res.status(code).json(orders);
  };

  public create = async (req: Request, res: Response) => {
    const { productsIds, user: { id } } = req.body;

    const dataOrder = await this.orderService.create(id, productsIds);

    if (dataOrder.message) {
      const { code, message } = dataOrder;
      return res.status(code).json({ message });
    }

    const userId = id;

    return res.status(dataOrder.code).json({ userId, productsIds });
  };
}

export default OrderController;