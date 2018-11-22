import { getConnection } from "typeorm";
import UserEntity from "../../entity/User";
import { User } from "../../../app/models";

class AuthServices {
  constructor() {}

  async getAll(): Promise<User[]> {
    const users = await getConnection()
      .getRepository(UserEntity)
      .find();
    return users;
  }
}

export default new AuthServices();
