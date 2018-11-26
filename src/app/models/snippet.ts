import Category from "./category";

export default class Snippet {
  id: number;
  categoryId: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
