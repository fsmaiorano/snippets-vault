import { UserService } from "../../database/services";

class UserController {
  constructor() {}

  getAll() {
    const users = UserService.getAll();
    debugger;
  }
}

export default new UserController();
