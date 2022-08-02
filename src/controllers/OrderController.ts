import { Request, Response } from 'express';
import OrderService from '../services/OrderService';

class OrderController {
  constructor(private orderService = new OrderService()) { }

  public getAll = async (_req: Request, res: Response) => {
    const { code, orders } = await this.orderService.getAll();
    return res.status(code).json(orders);
  };
}

export default OrderController;