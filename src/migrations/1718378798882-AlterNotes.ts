import { MigrationInterface, QueryRunner } from "typeorm";

export class  AlterNotes1718378798882 implements MigrationInterface {
   

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notes" DROP CONSTRAINT "FK_7df9a0949b2cb7a9c19c2d183a1"`);
        await queryRunner.query(`ALTER TABLE "notes" ADD "leadCallBackId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "notes" ADD "leadId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "notes" ALTER COLUMN "leadCallId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "notes" DROP CONSTRAINT "UQ_7df9a0949b2cb7a9c19c2d183a1"`);
        await queryRunner.query(`ALTER TABLE "lead_call" ADD CONSTRAINT "UQ_4df2617a5db2f9a704e52d4f94e" UNIQUE ("noteId")`);
        await queryRunner.query(`ALTER TABLE "lead_call" ADD CONSTRAINT "FK_4df2617a5db2f9a704e52d4f94e" FOREIGN KEY ("noteId") REFERENCES "notes"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lead_call" DROP CONSTRAINT "FK_4df2617a5db2f9a704e52d4f94e"`);
        await queryRunner.query(`ALTER TABLE "lead_call" DROP CONSTRAINT "UQ_4df2617a5db2f9a704e52d4f94e"`);
        await queryRunner.query(`ALTER TABLE "notes" ADD CONSTRAINT "UQ_7df9a0949b2cb7a9c19c2d183a1" UNIQUE ("leadCallId")`);
        await queryRunner.query(`ALTER TABLE "notes" ALTER COLUMN "leadCallId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "notes" DROP COLUMN "leadId"`);
        await queryRunner.query(`ALTER TABLE "notes" DROP COLUMN "leadCallBackId"`);
        await queryRunner.query(`ALTER TABLE "notes" ADD CONSTRAINT "FK_7df9a0949b2cb7a9c19c2d183a1" FOREIGN KEY ("leadCallId") REFERENCES "lead_call"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
