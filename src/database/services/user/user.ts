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
import User from "../../entity/User";

class UserServices {
  constructor() {}

  async getAll() {
    const users = await getConnection()
      .getRepository(User)
      .find();
    return users;
  }
}

export default new UserServices();
