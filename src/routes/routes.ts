import { Router, Request, Response, NextFunction } from "express";
import middlewares from "../middlewares/middlewares";

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
    this.router.get("/", this.root);
  }

  private root(req: Request, res: Response, next: NextFunction) {
    return res.render("index");
  }
}

export default Routes;
