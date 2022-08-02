import jwt from 'jsonwebtoken';
import connection from '../models/connection';
import UserModel from '../models/UserModel';

class LoginService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }
  
  public async login(username: string, password: string) {
    const loginExists = await this.model.checkUsernamePassword(username, password);
    if (!loginExists) return { code: 401, message: 'Username or password invalid' };

    const { id } = loginExists;

    const JWT_SECRET = 'senhaSecreta';

    const payload = {
      id,
      username,
    };

    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: '7d',
    });

    return { code: 200, token };
  }
}

export default LoginService;