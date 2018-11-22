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
  title: string;

  @ManyToOne(type => User, user => user.id)
  user: User;

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
