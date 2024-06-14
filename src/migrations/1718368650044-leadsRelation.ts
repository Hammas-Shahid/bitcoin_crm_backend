import { MigrationInterface, QueryRunner } from "typeorm";

export class LeadsRelation1718368650044 implements MigrationInterface {
    name = 'LeadsRelation1718368650044'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notes" DROP CONSTRAINT "FK_b86c5f2b5de1e7a3d2a428cfb55"`);
        await queryRunner.query(`ALTER TABLE "notes" ADD "noteId" integer`);
        await queryRunner.query(`ALTER TABLE "notes" ADD CONSTRAINT "UQ_f48dd072fb267935e38196a798f" UNIQUE ("noteId")`);
        await queryRunner.query(`ALTER TABLE "notes" ADD CONSTRAINT "FK_f48dd072fb267935e38196a798f" FOREIGN KEY ("noteId") REFERENCES "lead_call"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notes" DROP CONSTRAINT "FK_f48dd072fb267935e38196a798f"`);
        await queryRunner.query(`ALTER TABLE "notes" DROP CONSTRAINT "UQ_f48dd072fb267935e38196a798f"`);
        await queryRunner.query(`ALTER TABLE "notes" DROP COLUMN "noteId"`);
        await queryRunner.query(`ALTER TABLE "notes" ADD CONSTRAINT "FK_b86c5f2b5de1e7a3d2a428cfb55" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
