import { MigrationInterface, QueryRunner } from "typeorm";

export class  AlterNotesRelations1718377501221 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notes" DROP CONSTRAINT "FK_f48dd072fb267935e38196a798f"`);
        await queryRunner.query(`ALTER TABLE "lead_call" DROP CONSTRAINT "FK_4df2617a5db2f9a704e52d4f94e"`);
        await queryRunner.query(`ALTER TABLE "notes" RENAME COLUMN "noteId" TO "leadCallId"`);
        await queryRunner.query(`ALTER TABLE "notes" RENAME CONSTRAINT "UQ_f48dd072fb267935e38196a798f" TO "UQ_7df9a0949b2cb7a9c19c2d183a1"`);
        await queryRunner.query(`ALTER TABLE "lead_call" DROP CONSTRAINT "UQ_4df2617a5db2f9a704e52d4f94e"`);
        await queryRunner.query(`ALTER TABLE "notes" ADD CONSTRAINT "FK_7df9a0949b2cb7a9c19c2d183a1" FOREIGN KEY ("leadCallId") REFERENCES "lead_call"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notes" DROP CONSTRAINT "FK_7df9a0949b2cb7a9c19c2d183a1"`);
        await queryRunner.query(`ALTER TABLE "lead_call" ADD CONSTRAINT "UQ_4df2617a5db2f9a704e52d4f94e" UNIQUE ("noteId")`);
        await queryRunner.query(`ALTER TABLE "notes" RENAME CONSTRAINT "UQ_7df9a0949b2cb7a9c19c2d183a1" TO "UQ_f48dd072fb267935e38196a798f"`);
        await queryRunner.query(`ALTER TABLE "notes" RENAME COLUMN "leadCallId" TO "noteId"`);
        await queryRunner.query(`ALTER TABLE "lead_call" ADD CONSTRAINT "FK_4df2617a5db2f9a704e52d4f94e" FOREIGN KEY ("noteId") REFERENCES "notes"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "notes" ADD CONSTRAINT "FK_f48dd072fb267935e38196a798f" FOREIGN KEY ("noteId") REFERENCES "lead_call"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
