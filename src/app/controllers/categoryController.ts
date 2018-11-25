import { Response, Request, NextFunction } from "express";
import { CategoryService, SnippetService } from "../../database/services";
import { Category } from "../models";

class CategoryController {
  constructor() {}

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { title } = req.body;
      const { session } = req;

      let newCategory = new Category();
      newCategory.title = title;
      newCategory.user = session.user;
      newCategory.createdAt = new Date();
      newCategory.updatedAt = new Date();

      const category: Category = await CategoryService.create(newCategory);
      res.redirect(`/app/categories/${category.id}`);
    } catch (err) {
      console.log(err);
      return next(err);
    }
  }

  async show(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { session } = req;

      const categories = await CategoryService.getAllByUserId(
        parseInt(session.user.id)
      );

      const activeCategory = parseInt(id);
      const category = categories.filter(cat => cat.id === parseInt(id))[0];

      const snippets = await SnippetService.getAllByCategory(category);

      return res.render("categories/show", {
        categories,
        snippets,
        activeCategory
      });
    } catch (err) {
      console.log(err);
      return next(err);
    }
  }
}

export default new CategoryController();
