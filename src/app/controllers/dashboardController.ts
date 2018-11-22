import { Request, Response, NextFunction } from "express";

class DashboardController {
  constructor() {}

  async index(req: Request, res: Response, next: NextFunction) {
    return res.render("dashboard/index");
  }
}

export default new DashboardController();
