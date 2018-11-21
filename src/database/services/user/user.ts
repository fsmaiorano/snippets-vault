import {
  MigrationInterface,
  QueryRunner,
  QueryBuilder,
  Table,
  createConnection,
  getManager
} from "typeorm";
import User from "../../entity/User";

class UserServices {
  constructor() {}

  async getAll() {
    debugger;
    const users = await getManager()
      .createQueryBuilder(User, "user")
      .getMany();
    debugger;
  }
}

export default new UserServices();
