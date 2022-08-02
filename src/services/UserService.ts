import jwt from 'jsonwebtoken';
import connection from '../models/connection';
import UserModel from '../models/UserModel';
import { UserDetails } from '../interfaces/users.interface';

class UserService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }

  public async create(user: UserDetails) {
    const userExists = await this.model.getByUsername(user.username);

    if (userExists) return { code: 404, message: 'The user already exists!' };

    const { id, username, classe, level, password } = await this.model.create(user);

    const JWT_SECRET = 'senhaSecreta';

    const payload = { id, username, classe, level, password };

    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: '7d',
    });

    return { code: 201, token };
  }
}

export default UserService;