import { Request, Response } from 'express';
import ProductService from '../services/ProductService';
import { ProductDetails } from '../interfaces/products.interfaces';

class ProductController {
  constructor(private productService = new ProductService()) { }

  public create = async (req: Request, res: Response) => {
    const body = req.body as ProductDetails;

    const { code, newProduct } = await this.productService.create(body);

    return res.status(code).json(newProduct);
  };

  public getAll = async (_req: Request, res: Response) => {
    const { code, products } = await this.productService.getAll();

    return res.status(code).json(products);
  };
}

export default ProductController;