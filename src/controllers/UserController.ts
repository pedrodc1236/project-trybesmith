import { Request, Response } from 'express';
import UserService from '../services/UserService';
import { UserDetails } from '../interfaces/users.interface';

class UserController {
  constructor(private userService = new UserService()) { }

  public create = async (req: Request, res: Response) => {
    const body = req.body as UserDetails;

    const { code, token } = await this.userService.create(body);
    return res.status(code).json({ token });
  };
}

export default UserController;