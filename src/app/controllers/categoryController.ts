import { Response, Request, NextFunction } from "express";
import { CategoryService } from "../../database/services";
import { Category } from "../models";

class CategoryController {
  constructor() {}

  async create(req: Request, res: Response, next: NextFunction) {
    debugger;
    const { title } = req.body;
    const { session } = req;

    let newCategory = new Category();
    newCategory.title = title;
    newCategory.userId = session.user.id;
    newCategory.createdAt = new Date();
    newCategory.updatedAt = new Date();

    const category = await CategoryService.create(newCategory);
    debugger;
  }
}

export default new CategoryController();
