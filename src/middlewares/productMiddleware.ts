import { NextFunction, Request, Response } from 'express';
import { ProductDetails } from '../interfaces/products.interfaces';

const validateData = (name: string, amount: string) => {
  if (typeof name !== 'string') {
    const message = '"name" must be a string';
    return { code: 422, message };
  }
  if (name.length <= 2) {
    const message = '"name" length must be at least 3 characters long';
    return { code: 422, message };
  }

  if (typeof amount !== 'string') {
    const message = '"amount" must be a string';
    return { code: 422, message };
  }

  if (amount.length <= 2) {
    const message = '"amount" length must be at least 3 characters long';
    return { code: 422, message };
  }

  return {};
};

export default function validateBody(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { name, amount } = req.body as ProductDetails;

  if (!name) {
    const message = '"name" is required';
    return res.status(400).json({ message });
  }
  if (!amount) {
    const message = '"amount" is required';
    return res.status(400).json({ message });
  }

  const validate = validateData(name, amount);

  if (validate.message) {
    return res.status(validate.code).json({ message: validate.message });
  }

  next();
}