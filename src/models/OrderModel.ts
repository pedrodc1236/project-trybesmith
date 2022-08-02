import { Pool } from 'mysql2/promise';
import { OrderDetails } from '../interfaces/orders.interface';

export default class OrderModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<OrderDetails[]> {
    const query = `SELECT
      o.id, o.userId, JSON_ARRAYAGG(p.id) as productsIds
     FROM Trybesmith.Orders AS o
      INNER JOIN Trybesmith.Products AS p
      ON p.orderId = o.id
      GROUP BY o.id
      ORDER BY o.userId`;
    const [orders] = await this.connection.execute(query);

    return orders as OrderDetails[];
  }
}