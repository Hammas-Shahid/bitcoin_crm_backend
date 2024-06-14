import { MigrationInterface, QueryRunner } from "typeorm";

export class  NoteRelations1718371485431 implements MigrationInterface {
    

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lead" ADD "leadNoteId" integer`);
        await queryRunner.query(`ALTER TABLE "lead" ADD CONSTRAINT "UQ_1bc8c432f2b9427ca7072a9829b" UNIQUE ("leadNoteId")`);
        await queryRunner.query(`ALTER TABLE "lead" ADD "saleNoteId" integer`);
        await queryRunner.query(`ALTER TABLE "lead" ADD CONSTRAINT "UQ_123d284b33f998b49a8acdab320" UNIQUE ("saleNoteId")`);
        await queryRunner.query(`ALTER TABLE "lead_call_back" ADD CONSTRAINT "UQ_8d446e5d00a2fb25c0279e9a8b6" UNIQUE ("noteId")`);
        await queryRunner.query(`ALTER TABLE "lead_call" ADD CONSTRAINT "UQ_4df2617a5db2f9a704e52d4f94e" UNIQUE ("noteId")`);
        await queryRunner.query(`ALTER TABLE "lead_call_back" ADD CONSTRAINT "FK_8d446e5d00a2fb25c0279e9a8b6" FOREIGN KEY ("noteId") REFERENCES "notes"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "lead_call" ADD CONSTRAINT "FK_4df2617a5db2f9a704e52d4f94e" FOREIGN KEY ("noteId") REFERENCES "notes"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "lead" ADD CONSTRAINT "FK_1bc8c432f2b9427ca7072a9829b" FOREIGN KEY ("leadNoteId") REFERENCES "notes"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "lead" ADD CONSTRAINT "FK_123d284b33f998b49a8acdab320" FOREIGN KEY ("saleNoteId") REFERENCES "notes"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lead" DROP CONSTRAINT "FK_123d284b33f998b49a8acdab320"`);
        await queryRunner.query(`ALTER TABLE "lead" DROP CONSTRAINT "FK_1bc8c432f2b9427ca7072a9829b"`);
        await queryRunner.query(`ALTER TABLE "lead_call" DROP CONSTRAINT "FK_4df2617a5db2f9a704e52d4f94e"`);
        await queryRunner.query(`ALTER TABLE "lead_call_back" DROP CONSTRAINT "FK_8d446e5d00a2fb25c0279e9a8b6"`);
        await queryRunner.query(`ALTER TABLE "lead_call" DROP CONSTRAINT "UQ_4df2617a5db2f9a704e52d4f94e"`);
        await queryRunner.query(`ALTER TABLE "lead_call_back" DROP CONSTRAINT "UQ_8d446e5d00a2fb25c0279e9a8b6"`);
        await queryRunner.query(`ALTER TABLE "lead" DROP CONSTRAINT "UQ_123d284b33f998b49a8acdab320"`);
        await queryRunner.query(`ALTER TABLE "lead" DROP COLUMN "saleNoteId"`);
        await queryRunner.query(`ALTER TABLE "lead" DROP CONSTRAINT "UQ_1bc8c432f2b9427ca7072a9829b"`);
        await queryRunner.query(`ALTER TABLE "lead" DROP COLUMN "leadNoteId"`);
        await queryRunner.query(`ALTER TABLE "notes" ADD CONSTRAINT "FK_b86c5f2b5de1e7a3d2a428cfb55" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
