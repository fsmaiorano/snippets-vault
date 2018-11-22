import { Router, Request, Response, NextFunction } from "express";
import middlewares from "../middlewares/middlewares";

import {
  AuthController,
  DashboardController,
  CategoryController,
  SnippetController
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
    this.router.get("/app/dashboard", DashboardController.dashboard);

    // Categories
    this.router.post("/app/categories/create", CategoryController.create);
    this.router.get("/app/categories/:id", CategoryController.show);

    // Snippets
    this.router.post(
      "/app/categories/:categoryId/snippets/create",
      SnippetController.create
    );
    this.router.get(
      "/app/categories/:categoryId/snippets/:snippetId",
      SnippetController.show
    );
    this.router.put(
      "/app/categories/:categoryId/snippets/:snippetId",
      SnippetController.update
    );
    this.router.delete(
      "/app/categories/:categoryId/snippets/:snippetId",
      SnippetController.destroy
    );
  }
}

export default Routes;
