import { MigrationInterface, QueryRunner } from "typeorm";

export class LeadCallBacks1718205266952 implements MigrationInterface {
    name = 'LeadCallBacks1718205266952'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "lead_call_back" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer NOT NULL DEFAULT '1', "updated_by" integer, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "date" character varying NOT NULL, "time" character varying NOT NULL, "comment" character varying NOT NULL, "leadId" integer NOT NULL, CONSTRAINT "PK_81293867d18cdb237caf71cef6b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "lead_call_back" ADD CONSTRAINT "FK_6be83f6bbbee0311f1b11d8072c" FOREIGN KEY ("leadId") REFERENCES "lead"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lead_call_back" DROP CONSTRAINT "FK_6be83f6bbbee0311f1b11d8072c"`);
        await queryRunner.query(`DROP TABLE "lead_call_back"`);
    }

}
