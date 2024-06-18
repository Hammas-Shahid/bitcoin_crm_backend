import { MigrationInterface, QueryRunner } from "typeorm";

export class LeadCallBackComment1718681334414 implements MigrationInterface {
    name = 'LeadCallBackComment1718681334414'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lead_call_back" RENAME COLUMN "comment" TO "commentId"`);
        await queryRunner.query(`ALTER TABLE "lead_call_back" DROP COLUMN "commentId"`);
        await queryRunner.query(`ALTER TABLE "lead_call_back" ADD "commentId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "lead_call_back" ADD CONSTRAINT "UQ_277688a9aa84165ae8a70982275" UNIQUE ("commentId")`);
        await queryRunner.query(`ALTER TABLE "lead_call_back" ADD CONSTRAINT "FK_277688a9aa84165ae8a70982275" FOREIGN KEY ("commentId") REFERENCES "note"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lead_call_back" DROP CONSTRAINT "FK_277688a9aa84165ae8a70982275"`);
        await queryRunner.query(`ALTER TABLE "lead_call_back" DROP CONSTRAINT "UQ_277688a9aa84165ae8a70982275"`);
        await queryRunner.query(`ALTER TABLE "lead_call_back" DROP COLUMN "commentId"`);
        await queryRunner.query(`ALTER TABLE "lead_call_back" ADD "commentId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "lead_call_back" RENAME COLUMN "commentId" TO "comment"`);
    }

}
