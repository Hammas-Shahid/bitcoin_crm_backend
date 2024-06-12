import { MigrationInterface, QueryRunner } from "typeorm";

export class LeadContactsMods1718151707906 implements MigrationInterface {
    name = 'LeadContactsMods1718151707906'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "lead_contact" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer NOT NULL DEFAULT '1', "updated_by" integer, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "leadId" integer NOT NULL, "contactId" integer NOT NULL, CONSTRAINT "PK_0bd59c5be16d19ab0f926149228" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "lead_contact" ADD CONSTRAINT "FK_60f49e5b103f2676e2a71974820" FOREIGN KEY ("leadId") REFERENCES "lead"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "lead_contact" ADD CONSTRAINT "FK_95fe95c50e6e0b167f4fd436991" FOREIGN KEY ("contactId") REFERENCES "contacts"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lead_contact" DROP CONSTRAINT "FK_95fe95c50e6e0b167f4fd436991"`);
        await queryRunner.query(`ALTER TABLE "lead_contact" DROP CONSTRAINT "FK_60f49e5b103f2676e2a71974820"`);
        await queryRunner.query(`DROP TABLE "lead_contact"`);
    }

}
