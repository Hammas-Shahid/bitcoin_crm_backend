import { MigrationInterface, QueryRunner } from "typeorm";

export class StateEntity1718018305359 implements MigrationInterface {
    name = 'StateEntity1718018305359'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "state" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer NOT NULL DEFAULT '1', "updated_by" integer, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, CONSTRAINT "UQ_b2c4aef5929860729007ac32f6f" UNIQUE ("name"), CONSTRAINT "PK_549ffd046ebab1336c3a8030a12" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "state"`);
    }

}
