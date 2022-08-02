import connection from '../models/connection';
import OrderModel from '../models/OrderModel';

class OrderService {
  public model: OrderModel;

  constructor() {
    this.model = new OrderModel(connection);
  }

  public async getAll() {
    const orders = await this.model.getAll();
    return { code: 200, orders };
  }
}

export default OrderService;