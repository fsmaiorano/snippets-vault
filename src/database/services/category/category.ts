import { getConnection } from "typeorm";
import CategoryEntity from "../../entity/Category";
import { Category } from "../../../app/models";

class CategoryServices {
  constructor() {}

  async getAll(): Promise<Category[]> {
    const categories = await getConnection()
      .getRepository(CategoryEntity)
      .find();
    return categories;
  }

  async create(category: Category): Promise<Category> {
    const newCategory = await getConnection()
      .getRepository(CategoryEntity)
      .save(category);
    return newCategory;
  }
}

export default new CategoryServices();
