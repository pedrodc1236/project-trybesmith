import { Request, Response } from 'express';
import LoginService from '../services/LoginService';
import { UserLogin } from '../interfaces/users.interface';

class LoginController {
  constructor(private loginService = new LoginService()) { }

  public login = async (req: Request, res: Response) => {
    const { username, password } = req.body as UserLogin;

    const loggedConfirm = await this.loginService.login(username, password);

    if (loggedConfirm.message) {
      const { code, message } = loggedConfirm;
      return res.status(code).json({ message });
    }

    const { code, token } = loggedConfirm;

    return res.status(code).json({ token });
  };
}

export default LoginController;