import { getConnection } from "typeorm";
import UserEntity from "../../entity/User";
import User from "app/models/users";

class UserServices {
  constructor() {}

  async create(user: User): Promise<User> {
    const newUser = await getConnection()
      .getRepository(UserEntity)
      .save(user);
    return newUser;
  }

  async getAll(): Promise<User[]> {
    const users = await getConnection()
      .getRepository(UserEntity)
      .find();
    return users;
  }

  async getByEmail(email: string): Promise<User | undefined> {
    let user = await getConnection()
      .getRepository(UserEntity)
      .findOne({ where: { email: `${email}` } });
    return user;
  }
}

export default new UserServices();
