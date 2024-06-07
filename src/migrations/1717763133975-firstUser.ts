import { User, UserRoles } from 'src/users/entities/user.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class FirstUser1717763133975 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const userRepository = queryRunner.manager.getRepository(User);

    const newUser = new User();
    newUser.name = 'Admin';
    newUser.email = 'admin@admin.com';
    newUser.role = UserRoles.Admin;
    newUser.password = await bcrypt.hash('aA@123', 10);

    await userRepository.save(newUser);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
