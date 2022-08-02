import connection from '../models/connection';
import ProductModel from '../models/ProductModel';
import { ProductDetails } from '../interfaces/products.interfaces';

class ProductService {
  public model: ProductModel;

  constructor() {
    this.model = new ProductModel(connection);
  }

  public async create(product: ProductDetails) {
    const newProduct = await this.model.create(product);

    return { code: 201, newProduct };
  }

  public async getAll() {
    const products = await this.model.getAll();
    return { code: 200, products };
  }
}

export default ProductService;