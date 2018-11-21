import {
  MigrationInterface,
  QueryRunner,
  QueryBuilder,
  Table,
  createConnection,
  getManager
} from "typeorm";
import User from "../entity/User";

export class createUser1542745737741 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    // await queryRunner.connection.connect().then(async connection => {
    let user = new User();
    user.name = "fabio";
    user.email = "email@fabio.com";
    user.password = "pass";
    let userRepository = getManager().getRepository(User);
    await userRepository.save(user);
    // await connection.close();
    // });
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    queryRunner.dropTable("User");
  }
}
