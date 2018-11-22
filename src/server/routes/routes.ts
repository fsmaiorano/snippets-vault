import { Router, Request, Response, NextFunction } from "express";
import middlewares from "../middlewares/middlewares";

import {
  AuthController,
  DashboardController,
  CategoryController
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
    this.router.get("/", AuthController.signin);
    this.router.get("/signup", AuthController.signup);
    this.router.post("/register", AuthController.register);
    this.router.post("/authenticate", AuthController.authentication);

    // Dashboard
    this.router.get("/app/dashboard", DashboardController.index);

    // Categories
    this.router.post("/app/categories/create", CategoryController.create);
    this.router.get("/app/categories/:id", CategoryController.show);
  }
}

export default Routes;
