import { UserService } from "../../database/services";

// Models
import User from "app/models/users";

class UserController {
  constructor() {}

  async getAll(): Promise<User[]> {
    const users = await UserService.getAll();
    return users;
  }
}

export default new UserController();
