import { MigrationInterface, QueryRunner } from "typeorm";

export class leadCallComment1718676249321 implements MigrationInterface {
    name = 'Test1718676249321'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lead_call" RENAME COLUMN "comment" TO "commentId"`);
        await queryRunner.query(`CREATE TABLE "note" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer NOT NULL DEFAULT '1', "updated_by" integer, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "content" character varying NOT NULL, CONSTRAINT "PK_96d0c172a4fba276b1bbed43058" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "lead_call" DROP COLUMN "commentId"`);
        await queryRunner.query(`ALTER TABLE "lead_call" ADD "commentId" integer`);
        await queryRunner.query(`ALTER TABLE "lead_call" ADD CONSTRAINT "UQ_3a0b457958c55aa7d83aecf51a3" UNIQUE ("commentId")`);
        await queryRunner.query(`ALTER TABLE "lead_call" ADD CONSTRAINT "FK_3a0b457958c55aa7d83aecf51a3" FOREIGN KEY ("commentId") REFERENCES "note"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lead_call" DROP CONSTRAINT "FK_3a0b457958c55aa7d83aecf51a3"`);
        await queryRunner.query(`ALTER TABLE "lead_call" DROP CONSTRAINT "UQ_3a0b457958c55aa7d83aecf51a3"`);
        await queryRunner.query(`ALTER TABLE "lead_call" DROP COLUMN "commentId"`);
        await queryRunner.query(`ALTER TABLE "lead_call" ADD "commentId" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "note"`);
        await queryRunner.query(`ALTER TABLE "lead_call" RENAME COLUMN "commentId" TO "comment"`);
    }

}
