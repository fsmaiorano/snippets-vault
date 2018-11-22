import { Request, Response, NextFunction } from "express";
import { CategoryService } from "../../database/services";
import { Category } from "../models";

class DashboardController {
  constructor() {}

  async dashboard(req: Request, res: Response, next: NextFunction) {
    try {
      const { session } = req;

      const categories: Category[] = await CategoryService.getAllByUserId(
        parseInt(session.user.id)
      );

      return res.render("dashboard/index", { categories });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

export default new DashboardController();
