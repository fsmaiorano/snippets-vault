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

  @ManyToOne(type => User, user => user.id)
  userId!: User;

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
