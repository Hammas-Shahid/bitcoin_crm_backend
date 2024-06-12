import { MigrationInterface, QueryRunner } from 'typeorm';

export class LeadEntityFixed1718111180662 implements MigrationInterface {
  name = 'LeadEntityFixed1718111180662';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "lead" DROP COLUMN "legalName"`);
    await queryRunner.query(`ALTER TABLE "lead" DROP COLUMN "legalType"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "lead" ADD "legalType" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "lead" ADD "legalName" character varying NOT NULL`,
    );
  }
}
