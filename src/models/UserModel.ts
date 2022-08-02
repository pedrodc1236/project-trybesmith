import { Pool, ResultSetHeader } from 'mysql2/promise';
import { UserDetails, UserIdFull } from '../interfaces/users.interface';

export default class UserModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getByUsername(username: string): Promise <UserIdFull | null> {
    const query = 'SELECT * FROM Trybesmith.Users WHERE username = ?';
    const [data] = await this.connection.execute(query, [username]);
    const [user] = data as UserIdFull[];

    return user || null;
  }

  public async checkUsernamePassword(username: string, password: string):
  Promise <UserIdFull | null> {
    const query = 'SELECT * FROM Trybesmith.Users WHERE username = ? AND password = ?';
    const [data] = await this.connection.execute(query, [username, password]);
    const [user] = data as UserIdFull[];

    return user || null;
  }

  public async create(user: UserDetails): Promise<UserIdFull> {
    const { username, classe, level, password } = user;

    const query = `INSERT INTO Trybesmith
      .Users (username, classe, level, password) VALUES (?, ?, ?, ?)`;

    const [data] = await this.connection
      .execute<ResultSetHeader>(query, [username, classe, level, password]);
    
    const { insertId } = data;
    const id = insertId;
    const newUser = { id, username, classe, level, password };
    return newUser;
  }
}