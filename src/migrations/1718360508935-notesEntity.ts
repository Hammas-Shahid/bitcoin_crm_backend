import { MigrationInterface, QueryRunner } from "typeorm";

export class NotesEntity1718360508935 implements MigrationInterface {
    name = 'NotesEntity1718360508935'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lead" DROP CONSTRAINT "FK_c80a9e90c20d68a23f92fd439ff"`);
        await queryRunner.query(`ALTER TABLE "lead_call" RENAME COLUMN "comment" TO "noteId"`);
        await queryRunner.query(`ALTER TABLE "lead_call_back" RENAME COLUMN "comment" TO "noteId"`);
        await queryRunner.query(`CREATE TYPE "public"."notes_type_enum" AS ENUM('Call Note', 'Call Back Note', 'Sale Note', 'Lead Note')`);
        await queryRunner.query(`CREATE TABLE "notes" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer NOT NULL DEFAULT '1', "updated_by" integer, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "note" character varying NOT NULL, "type" "public"."notes_type_enum" NOT NULL, CONSTRAINT "PK_af6206538ea96c4e77e9f400c3d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "lead" DROP COLUMN "state"`);
        await queryRunner.query(`ALTER TABLE "lead" DROP COLUMN "saleMadeById"`);
        await queryRunner.query(`ALTER TABLE "lead_call" DROP COLUMN "noteId"`);
        await queryRunner.query(`ALTER TABLE "lead_call" ADD "noteId" integer`);
        await queryRunner.query(`ALTER TABLE "lead_call_back" DROP COLUMN "noteId"`);
        await queryRunner.query(`ALTER TABLE "lead_call_back" ADD "noteId" integer`);
        await queryRunner.query(`ALTER TABLE "lead" DROP CONSTRAINT "FK_1105241a7fe81d294844feace28"`);
        await queryRunner.query(`ALTER TABLE "lead" DROP CONSTRAINT "FK_a5fa2df0cee6769fa270a4b0d8f"`);
        await queryRunner.query(`ALTER TABLE "lead" DROP CONSTRAINT "FK_a1589d9589bfb0380ea2be6f84d"`);
        await queryRunner.query(`ALTER TABLE "lead" ALTER COLUMN "businessTypeId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "lead" ALTER COLUMN "city" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "lead" ALTER COLUMN "zipCode" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "lead" ALTER COLUMN "email" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "lead" ALTER COLUMN "assigneeId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "lead" ALTER COLUMN "statusId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "lead" ADD CONSTRAINT "FK_a5fa2df0cee6769fa270a4b0d8f" FOREIGN KEY ("assigneeId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lead" ADD CONSTRAINT "FK_1105241a7fe81d294844feace28" FOREIGN KEY ("businessTypeId") REFERENCES "business_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lead" ADD CONSTRAINT "FK_a1589d9589bfb0380ea2be6f84d" FOREIGN KEY ("statusId") REFERENCES "statuses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lead" DROP CONSTRAINT "FK_a1589d9589bfb0380ea2be6f84d"`);
        await queryRunner.query(`ALTER TABLE "lead" DROP CONSTRAINT "FK_1105241a7fe81d294844feace28"`);
        await queryRunner.query(`ALTER TABLE "lead" DROP CONSTRAINT "FK_a5fa2df0cee6769fa270a4b0d8f"`);
        await queryRunner.query(`ALTER TABLE "lead" ALTER COLUMN "statusId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "lead" ALTER COLUMN "assigneeId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "lead" ALTER COLUMN "email" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "lead" ALTER COLUMN "zipCode" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "lead" ALTER COLUMN "city" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "lead" ALTER COLUMN "businessTypeId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "lead" ADD CONSTRAINT "FK_a1589d9589bfb0380ea2be6f84d" FOREIGN KEY ("statusId") REFERENCES "statuses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lead" ADD CONSTRAINT "FK_a5fa2df0cee6769fa270a4b0d8f" FOREIGN KEY ("assigneeId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lead" ADD CONSTRAINT "FK_1105241a7fe81d294844feace28" FOREIGN KEY ("businessTypeId") REFERENCES "business_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lead_call_back" DROP COLUMN "noteId"`);
        await queryRunner.query(`ALTER TABLE "lead_call_back" ADD "noteId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "lead_call" DROP COLUMN "noteId"`);
        await queryRunner.query(`ALTER TABLE "lead_call" ADD "noteId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "lead" ADD "saleMadeById" integer`);
        await queryRunner.query(`ALTER TABLE "lead" ADD "state" character varying`);
        await queryRunner.query(`DROP TABLE "notes"`);
        await queryRunner.query(`DROP TYPE "public"."notes_type_enum"`);
        await queryRunner.query(`ALTER TABLE "lead_call_back" RENAME COLUMN "noteId" TO "comment"`);
        await queryRunner.query(`ALTER TABLE "lead_call" RENAME COLUMN "noteId" TO "comment"`);
        await queryRunner.query(`ALTER TABLE "lead" ADD CONSTRAINT "FK_c80a9e90c20d68a23f92fd439ff" FOREIGN KEY ("saleMadeById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
