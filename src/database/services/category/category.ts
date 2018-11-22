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

  async getAllByUserId(userId: number): Promise<Category[]> {
    const categories = await getConnection()
      .getRepository(CategoryEntity)
      .find({ where: { userId: userId } });
    return categories;
  }

  async getById(categoryId: number): Promise<Category> {
    const category = await getConnection()
      .getRepository(CategoryEntity)
      .findOne({ where: { id: categoryId } });
    return category;
  }

  async create(category: Category): Promise<Category> {
    const newCategory = await getConnection()
      .getRepository(CategoryEntity)
      .save(category);
    return newCategory;
  }
}

export default new CategoryServices();
