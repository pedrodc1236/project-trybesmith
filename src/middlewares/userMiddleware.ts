import { NextFunction, Request, Response } from 'express';
import { UserDetails } from '../interfaces/users.interface';

const validateExists = (username: string, classe: string, level: number, password: string) => {
  if (!username) {
    const message = '"username" is required';
    return { code: 400, message };
  }

  if (!classe) {
    const message = '"classe" is required';
    return { code: 400, message };
  }

  if (level === undefined) {
    const message = '"level" is required';
    return { code: 400, message };
  }

  if (!password) {
    const message = '"password" is required';
    return { code: 400, message };
  }

  return {};
};

const validateType = (username: string, classe: string, level: number, password: string) => {
  if (typeof username !== 'string') {
    const message = '"username" must be a string';
    return { code: 422, message };
  }

  if (typeof classe !== 'string') {
    const message = '"classe" must be a string';
    return { code: 422, message };
  }

  if (typeof level !== 'number') {
    const message = '"level" must be a number';
    return { code: 422, message };
  }

  if (typeof password !== 'string') {
    const message = '"password" must be a string';
    return { code: 422, message };
  }

  return {};
};

const validateLength = (username: string, classe: string, level: number, password: string) => {
  if (username.length <= 2) {
    const message = '"username" length must be at least 3 characters long';
    return { code: 422, message };
  }

  if (classe.length <= 2) {
    const message = '"classe" length must be at least 3 characters long';
    return { code: 422, message };
  }

  if (level < 1) {
    const message = '"level" must be greater than or equal to 1';
    return { code: 422, message };
  }

  if (password.length <= 8) {
    const message = '"password" length must be at least 8 characters long';
    return { code: 422, message };
  }

  return {};
};

export default function validateBody(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { username, classe, level, password } = req.body as UserDetails;
  const validate1 = validateExists(username, classe, level, password);
  if (validate1.message) return res.status(validate1.code).json({ message: validate1.message });
  const validate2 = validateType(username, classe, level, password);
  if (validate2.message) return res.status(validate2.code).json({ message: validate2.message });
  const validate3 = validateLength(username, classe, level, password);
  if (validate3.message) return res.status(validate3.code).json({ message: validate3.message });

  next();
}