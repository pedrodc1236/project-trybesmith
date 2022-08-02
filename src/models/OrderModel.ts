import { Pool, ResultSetHeader } from 'mysql2/promise';
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

  public async create(userId: number, productsIds: number[]): Promise<OrderDetails> {
    await Promise.all(productsIds.map(async (productId) => {
      const queryCreateOrder = 'INSERT INTO Trybesmith.Orders (userId) VALUES (?)';
      const [order] = await this.connection.execute<ResultSetHeader>(queryCreateOrder, [userId]);
      const { insertId } = order;

      const queryUpdateProductOrder = 'UPDATE Trybesmith.Products SET orderId = ? WHERE id = ? ';
      await this.connection
        .execute<ResultSetHeader>(queryUpdateProductOrder, [insertId, productId]);
    }));
    const order = { userId, productsIds };
    return order;
  }
}