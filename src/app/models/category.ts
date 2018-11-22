import User from "./user";

export default class Category {
  id?: number;
  title: string;
  user?: User;
  createdAt: Date;
  updatedAt: Date;
}
