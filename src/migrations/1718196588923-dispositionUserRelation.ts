import { MigrationInterface, QueryRunner } from 'typeorm';

export class DispositionUserRelation1718196588923
  implements MigrationInterface
{
  name = 'DispositionUserRelation1718196588923';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "dispositions" ADD CONSTRAINT "FK_c4eeef3d2f51353ecff8942f96d" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "dispositions" DROP CONSTRAINT "FK_c4eeef3d2f51353ecff8942f96d"`,
    );
  }
}
