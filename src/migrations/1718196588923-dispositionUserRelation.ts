import { MigrationInterface, QueryRunner } from "typeorm";

export class DispositionUserRelation1718196588923 implements MigrationInterface {
    name = 'DispositionUserRelation1718196588923'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lead_call" DROP CONSTRAINT "FK_4babe2149824ea9d8b164d00163"`);
        await queryRunner.query(`ALTER TABLE "lead_call" DROP CONSTRAINT "FK_4016097fe35a78ee061125b3338"`);
        await queryRunner.query(`ALTER TABLE "dispositions" ADD CONSTRAINT "FK_c4eeef3d2f51353ecff8942f96d" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "lead_call" ADD CONSTRAINT "FK_4babe2149824ea9d8b164d00163" FOREIGN KEY ("leadId") REFERENCES "lead"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lead_call" ADD CONSTRAINT "FK_4016097fe35a78ee061125b3338" FOREIGN KEY ("callDispositionId") REFERENCES "dispositions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lead_call" DROP CONSTRAINT "FK_4016097fe35a78ee061125b3338"`);
        await queryRunner.query(`ALTER TABLE "lead_call" DROP CONSTRAINT "FK_4babe2149824ea9d8b164d00163"`);
        await queryRunner.query(`ALTER TABLE "dispositions" DROP CONSTRAINT "FK_c4eeef3d2f51353ecff8942f96d"`);
        await queryRunner.query(`ALTER TABLE "lead_call" ADD CONSTRAINT "FK_4016097fe35a78ee061125b3338" FOREIGN KEY ("callDispositionId") REFERENCES "dispositions"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "lead_call" ADD CONSTRAINT "FK_4babe2149824ea9d8b164d00163" FOREIGN KEY ("leadId") REFERENCES "lead"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
