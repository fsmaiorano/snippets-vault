import { Router, Request, Response, NextFunction } from "express";
import middlewares from "../middlewares/middlewares";

import { UserController, AuthController } from "../../app/controllers";

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

    // Auth
    this.router.get("/", this.auth);
    this.router.post("/authenticate", this.auth);

    this.router.get("/users", this.users);
  }

  private auth(req: Request, res: Response, next: NextFunction) {
    if (req.method === "POST") {
      switch (req.path) {
        case "/authenticate":
          AuthController.authentication(req, res, next);
          break;
        default:
      }
    }

    return res.render("auth/signin");
  }

  private users(req: Request, res: Response, next: NextFunction) {
    const userController = UserController.getAll();
    return res.render("index");
  }
}

export default Routes;
