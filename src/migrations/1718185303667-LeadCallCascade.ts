import { MigrationInterface, QueryRunner } from "typeorm";

export class LeadCallCascade1718185303667 implements MigrationInterface {
    name = 'LeadCallCascade1718185303667'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lead_call" DROP CONSTRAINT "FK_4babe2149824ea9d8b164d00163"`);
        await queryRunner.query(`ALTER TABLE "lead_call" DROP CONSTRAINT "FK_4016097fe35a78ee061125b3338"`);
        await queryRunner.query(`ALTER TABLE "lead_call" ADD CONSTRAINT "FK_4babe2149824ea9d8b164d00163" FOREIGN KEY ("leadId") REFERENCES "lead"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "lead_call" ADD CONSTRAINT "FK_4016097fe35a78ee061125b3338" FOREIGN KEY ("callDispositionId") REFERENCES "dispositions"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lead_call" DROP CONSTRAINT "FK_4016097fe35a78ee061125b3338"`);
        await queryRunner.query(`ALTER TABLE "lead_call" DROP CONSTRAINT "FK_4babe2149824ea9d8b164d00163"`);
        await queryRunner.query(`ALTER TABLE "lead_call" ADD CONSTRAINT "FK_4016097fe35a78ee061125b3338" FOREIGN KEY ("callDispositionId") REFERENCES "dispositions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lead_call" ADD CONSTRAINT "FK_4babe2149824ea9d8b164d00163" FOREIGN KEY ("leadId") REFERENCES "lead"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
