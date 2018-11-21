import { Router, Request, Response, NextFunction } from "express";
import middlewares from "../middlewares/middlewares";

import { UserController } from "../../app/controllers";

class Routes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  init() {
    // MIDDLEWARES
    this.router.use(middlewares.log);

    // ROUTES
    this.router.get("/", this.auth);

    this.router.get("/users", this.users);
  }

  private auth(req: Request, res: Response, next: NextFunction) {
    return res.render("auth/signin");
  }

  private users(req: Request, res: Response, next: NextFunction) {
    const userController = UserController.getAll();
    return res.render("index");
  }
}

export default Routes;
