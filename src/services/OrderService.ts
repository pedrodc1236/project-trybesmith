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

  public async create(user: number, productsIds: number[]) {
    if (!productsIds) {
      const message = '"productsIds" is required';
      return { code: 400, message };
    } 

    if (!Array.isArray(productsIds)) {
      const message = '"productsIds" must be an array';
      return { code: 422, message };
    }

    if (productsIds.length === 0) {
      const message = '"productsIds" must include only numbers';
      return { code: 422, message };
    }

    const order = await this.model.create(user, productsIds);
    return { code: 201, order };
  }
}

export default OrderService;