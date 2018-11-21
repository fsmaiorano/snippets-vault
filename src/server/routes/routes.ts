import { Router, Request, Response, NextFunction } from "express";
import middlewares from "../middlewares/middlewares";

import {
  UserController,
  AuthController,
  DashboardController
} from "../../app/controllers";

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
    this.router.get("/signup", this.auth);
    this.router.post("/register", this.auth);
    this.router.post("/authenticate", this.auth);

    // Dashboard
    this.router.get("/app/dashboard", this.dashboard);
  }

  private auth(req: Request, res: Response, next: NextFunction) {
    if (req.method === "POST") {
      switch (req.path) {
        case "/authenticate":
          return AuthController.authentication(req, res, next);
        case "/register":
          return AuthController.register(req, res, next);
        default:
      }
    }
    if (req.method === "GET") {
      switch (req.path) {
        case "/":
          return AuthController.signin(req, res, next);
        case "/signup":
          return AuthController.signup(req, res, next);
        default:
      }
    }
  }

  private dashboard(req: Request, res: Response, next: NextFunction) {
    return DashboardController.index(req, res, next);
  }

  // private users(req: Request, res: Response, next: NextFunction) {
  //   const userController = UserController.getAll();
  //   return res.render("index");
  // }
}

export default Routes;
