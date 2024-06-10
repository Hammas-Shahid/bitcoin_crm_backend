import { MigrationInterface, QueryRunner } from "typeorm";

export class BusinessTypeEntity1718011455812 implements MigrationInterface {
    name = 'BusinessTypeEntity1718011455812'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "business_type" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer NOT NULL DEFAULT '1', "updated_by" integer, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, CONSTRAINT "UQ_3380c75b13b1e097e3285cc8d08" UNIQUE ("name"), CONSTRAINT "PK_dcc57dda934350221e1ff807bfa" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "business_type"`);
    }

}
