import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export default class User {
  @PrimaryGeneratedColumn({
    type: 'integer'
  })
  id!: number;

  @Column({
    nullable: false,
    type: 'text'
  })
  name!: string;

  @Column({
    nullable: false,
    type: 'text'
  })
  email!: string;

  @Column({
    nullable: false,
    type: 'text'
  })
  password!: string;

  @Column({
    nullable: true,
    type: 'date'
  })
  createdAt!: Date;

  @Column({
    nullable: true,
    type: 'date'
  })
  updatedAt!: Date;
}
