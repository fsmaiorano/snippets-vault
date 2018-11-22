import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import Category from "./Category";

@Entity()
export default class Snippet {
  @PrimaryGeneratedColumn({
    type: "integer"
  })
  id!: number;

  @Column({
    nullable: false,
    type: "text"
  })
  title: string;

  @Column({
    nullable: false,
    type: "text"
  })
  content: string;

  @ManyToOne(type => Category, category => category, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
    nullable: false
  })
  category: Category;

  @Column({
    nullable: true,
    type: "datetime"
  })
  createdAt: Date;

  @Column({
    nullable: true,
    type: "datetime"
  })
  updatedAt: Date;
}
