import { getConnection } from "typeorm";
import SnippetEntity from "../../entity/Snippet";
import { Snippet, Category } from "../../../app/models";

class CategoryServices {
  constructor() {}

  async getAll(): Promise<Snippet[]> {
    const snippets = await getConnection()
      .getRepository(SnippetEntity)
      .find();
    return snippets;
  }

  async getAllByUserId(userId: number): Promise<Snippet[]> {
    const snippets = await getConnection()
      .getRepository(SnippetEntity)
      .find({ where: { userId: userId } });
    return snippets;
  }

  async getAllByCategory(category: Category): Promise<Snippet[]> {
    const snippets = await getConnection()
      .getRepository(SnippetEntity)
      .find({ where: { category: category } });
    return snippets;
  }

  async create(snippet: Snippet): Promise<Snippet> {
    const newSnippet = await getConnection()
      .getRepository(SnippetEntity)
      .save(snippet);
    return newSnippet;
  }
}

export default new CategoryServices();
