import { Pool, ResultSetHeader } from 'mysql2/promise';
import { ProductDetails, ProductId, ProductFull } from '../interfaces/products.interfaces';

export default class ProductModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async create(product: ProductDetails): Promise<ProductId> {
    const { name, amount } = product;
    const query = 'INSERT INTO Trybesmith.Products (name, amount) VALUES (?, ?)';
    const [data] = await this.connection.execute<ResultSetHeader>(query, [name, amount]);
    const { insertId } = data;
    const id = insertId;
    const newUser = { id, name, amount };
    return newUser;
  }

  public async getAll(): Promise<ProductFull[]> {
    const query = 'SELECT * FROM Trybesmith.Products';
    const [products] = await this.connection.execute(query);
    return products as ProductFull[];
  }
}