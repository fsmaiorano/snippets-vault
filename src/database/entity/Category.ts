import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import User from "./User";

@Entity()
export default class Category {
  @PrimaryGeneratedColumn({
    type: "integer"
  })
  id!: number;

  @Column({
    nullable: false,
    type: "text"
  })
  title!: string;

  @ManyToOne(type => Category, user => user.id)
  user!: User;

  @Column({
    nullable: true,
    type: "date"
  })
  createdAt!: Date;

  @Column({
    nullable: true,
    type: "date"
  })
  updatedAt!: Date;
}
