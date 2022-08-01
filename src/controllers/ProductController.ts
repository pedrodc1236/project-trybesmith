import { Request, Response } from 'express';
import ProductService from '../services/ProductService';
import { ProductDetails } from '../interfaces/products.interfaces';

class ProductController {
  constructor(private productService = new ProductService()) { }

  public create = async (req: Request, res: Response) => {
    const body = req.body as ProductDetails;

    const newProduct = await this.productService.create(body);

    return res.status(newProduct.code).json(newProduct.newProduct);
  };
}

export default ProductController;