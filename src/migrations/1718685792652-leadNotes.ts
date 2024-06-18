import { MigrationInterface, QueryRunner } from "typeorm";

export class LeadNotes1718685792652 implements MigrationInterface {
    name = 'LeadNotes1718685792652'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "lead_note" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer NOT NULL DEFAULT '1', "updated_by" integer, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "leadId" integer NOT NULL, "noteId" integer NOT NULL, CONSTRAINT "REL_b841053724dee148fecba90a22" UNIQUE ("noteId"), CONSTRAINT "PK_e62f034a6e3ccd9301a0f8bc2ad" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "lead_note" ADD CONSTRAINT "FK_9a646f71bf63528d360c9e0f8f6" FOREIGN KEY ("leadId") REFERENCES "lead"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "lead_note" ADD CONSTRAINT "FK_b841053724dee148fecba90a22d" FOREIGN KEY ("noteId") REFERENCES "note"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lead_note" DROP CONSTRAINT "FK_b841053724dee148fecba90a22d"`);
        await queryRunner.query(`ALTER TABLE "lead_note" DROP CONSTRAINT "FK_9a646f71bf63528d360c9e0f8f6"`);
        await queryRunner.query(`DROP TABLE "lead_note"`);
    }

}
