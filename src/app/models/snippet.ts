import Category from "./category";

export default class Snippet {
  id: number;
  category: Category;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
