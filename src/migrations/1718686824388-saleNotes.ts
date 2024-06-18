import { MigrationInterface, QueryRunner } from "typeorm";

export class SaleNotes1718686824388 implements MigrationInterface {
    name = 'SaleNotes1718686824388'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sale_note" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer NOT NULL DEFAULT '1', "updated_by" integer, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "saleId" integer NOT NULL, "noteId" integer NOT NULL, CONSTRAINT "REL_06f8b303fb071b978860f9e6bc" UNIQUE ("noteId"), CONSTRAINT "PK_172d5ad55df9e3e8c3f313a6b39" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "sale_note" ADD CONSTRAINT "FK_0923acaf06fd38e2cae38b60725" FOREIGN KEY ("saleId") REFERENCES "lead"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "sale_note" ADD CONSTRAINT "FK_06f8b303fb071b978860f9e6bc8" FOREIGN KEY ("noteId") REFERENCES "note"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sale_note" DROP CONSTRAINT "FK_06f8b303fb071b978860f9e6bc8"`);
        await queryRunner.query(`ALTER TABLE "sale_note" DROP CONSTRAINT "FK_0923acaf06fd38e2cae38b60725"`);
        await queryRunner.query(`DROP TABLE "sale_note"`);
    }

}
