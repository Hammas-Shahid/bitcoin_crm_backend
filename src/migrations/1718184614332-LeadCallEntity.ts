import { MigrationInterface, QueryRunner } from "typeorm";

export class LeadCallEntity1718184614332 implements MigrationInterface {
    name = 'LeadCallEntity1718184614332'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "lead_call" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer NOT NULL DEFAULT '1', "updated_by" integer, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "duration" character varying NOT NULL, "comment" character varying NOT NULL, "dispositionId" integer NOT NULL, "leadId" integer NOT NULL, "callDispositionId" integer NOT NULL, CONSTRAINT "PK_b38b3c5ef2af834b9fd28fb4c9c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "lead_call" ADD CONSTRAINT "FK_4babe2149824ea9d8b164d00163" FOREIGN KEY ("leadId") REFERENCES "lead"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lead_call" ADD CONSTRAINT "FK_4016097fe35a78ee061125b3338" FOREIGN KEY ("callDispositionId") REFERENCES "dispositions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lead_call" DROP CONSTRAINT "FK_4016097fe35a78ee061125b3338"`);
        await queryRunner.query(`ALTER TABLE "lead_call" DROP CONSTRAINT "FK_4babe2149824ea9d8b164d00163"`);
        await queryRunner.query(`DROP TABLE "lead_call"`);
    }

}
