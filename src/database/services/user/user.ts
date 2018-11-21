import {
  MigrationInterface,
  QueryRunner,
  QueryBuilder,
  Table,
  createConnection,
  getManager,
  Connection,
  getConnection
} from "typeorm";
import UserEntity from "../../entity/User";
import User from "app/models/users";

class UserServices {
  constructor() {}

  async getAll(): Promise<User[]> {
    const users = await getConnection()
      .getRepository(UserEntity)
      .find();
    return users;
  }
}

export default new UserServices();
