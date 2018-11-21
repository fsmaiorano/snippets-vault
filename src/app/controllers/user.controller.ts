import { UserService } from "../../database/services";

class UserController {
  constructor() {}

  async getAll() {
    const users = await UserService.getAll();
    debugger;
  }
}

export default new UserController();
