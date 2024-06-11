import { MigrationInterface, QueryRunner } from "typeorm";

export class StatusEntity1718033792370 implements MigrationInterface {
    name = 'StatusEntity1718033792370'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "statuses" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer NOT NULL DEFAULT '1', "updated_by" integer, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "stateId" integer, CONSTRAINT "UQ_037e43ea842b18ce4e5f4dcfd06" UNIQUE ("name"), CONSTRAINT "PK_2fd3770acdb67736f1a3e3d5399" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "statuses" ADD CONSTRAINT "FK_931957ca4031e541303d515ecf6" FOREIGN KEY ("stateId") REFERENCES "state"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "statuses" DROP CONSTRAINT "FK_931957ca4031e541303d515ecf6"`);
        await queryRunner.query(`DROP TABLE "statuses"`);
    }

}
