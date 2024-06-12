import { MigrationInterface, QueryRunner } from 'typeorm';

export class Bug1718199704193 implements MigrationInterface {
  name = 'Bug1718199704193';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "lead_call" DROP CONSTRAINT "FK_4babe2149824ea9d8b164d00163"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lead_call" ADD CONSTRAINT "FK_4babe2149824ea9d8b164d00163" FOREIGN KEY ("leadId") REFERENCES "lead"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "lead_call" ADD CONSTRAINT "FK_fb7843b1e046a1f1e1e604520dc" FOREIGN KEY ("dispositionId") REFERENCES "dispositions"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "lead_call" DROP CONSTRAINT "FK_fb7843b1e046a1f1e1e604520dc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lead_call" DROP CONSTRAINT "FK_4babe2149824ea9d8b164d00163"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lead_call" ADD CONSTRAINT "FK_4babe2149824ea9d8b164d00163" FOREIGN KEY ("leadId") REFERENCES "lead"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
