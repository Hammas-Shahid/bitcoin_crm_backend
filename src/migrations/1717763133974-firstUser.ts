import { User, UserRoles } from 'src/users/entities/user.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class FirstUser1717763133974 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const userRepository = queryRunner.manager.getRepository(User);
    const newUser = new User();
    newUser.name = 'Bilal';
    newUser.email = 'bilal@gmail.com';
    newUser.role = UserRoles.Admin;
    newUser.password = '123456';

    await userRepository.save(newUser);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
