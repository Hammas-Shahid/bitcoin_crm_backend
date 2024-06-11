import { MigrationInterface, QueryRunner } from "typeorm";

export class LeadsEntity1718071578424 implements MigrationInterface {
    name = 'LeadsEntity1718071578424'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "statuses" DROP CONSTRAINT "FK_931957ca4031e541303d515ecf6"`);
        await queryRunner.query(`CREATE TABLE "lead" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer NOT NULL DEFAULT '1', "updated_by" integer, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "businessName" character varying NOT NULL, "address" character varying NOT NULL, "city" character varying NOT NULL, "zipCode" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "email" character varying NOT NULL, "legalName" character varying NOT NULL, "legalType" character varying NOT NULL, "businessTypeId" integer NOT NULL, "assigneeId" integer NOT NULL, CONSTRAINT "UQ_7686d7f1326b65108e731dc50cc" UNIQUE ("address"), CONSTRAINT "PK_ca96c1888f7dcfccab72b72fffa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "statuses" ADD CONSTRAINT "FK_931957ca4031e541303d515ecf6" FOREIGN KEY ("stateId") REFERENCES "state"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "lead" ADD CONSTRAINT "FK_1105241a7fe81d294844feace28" FOREIGN KEY ("businessTypeId") REFERENCES "business_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lead" ADD CONSTRAINT "FK_a5fa2df0cee6769fa270a4b0d8f" FOREIGN KEY ("assigneeId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lead" DROP CONSTRAINT "FK_a5fa2df0cee6769fa270a4b0d8f"`);
        await queryRunner.query(`ALTER TABLE "lead" DROP CONSTRAINT "FK_1105241a7fe81d294844feace28"`);
        await queryRunner.query(`ALTER TABLE "statuses" DROP CONSTRAINT "FK_931957ca4031e541303d515ecf6"`);
        await queryRunner.query(`DROP TABLE "lead"`);
        await queryRunner.query(`ALTER TABLE "statuses" ADD CONSTRAINT "FK_931957ca4031e541303d515ecf6" FOREIGN KEY ("stateId") REFERENCES "state"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
