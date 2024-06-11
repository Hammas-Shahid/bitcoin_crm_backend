import { MigrationInterface, QueryRunner } from "typeorm";

export class DispositionEntity1718067945462 implements MigrationInterface {
    name = 'DispositionEntity1718067945462'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "dispositions" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer NOT NULL DEFAULT '1', "updated_by" integer, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, CONSTRAINT "UQ_5eae48b4336c4a5260b8e65c978" UNIQUE ("name"), CONSTRAINT "PK_910039d536836fd1ec73c6d7424" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "statuses" DROP CONSTRAINT "FK_931957ca4031e541303d515ecf6"`);
        await queryRunner.query(`ALTER TABLE "statuses" ALTER COLUMN "stateId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "statuses" ADD CONSTRAINT "FK_931957ca4031e541303d515ecf6" FOREIGN KEY ("stateId") REFERENCES "state"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "statuses" DROP CONSTRAINT "FK_931957ca4031e541303d515ecf6"`);
        await queryRunner.query(`ALTER TABLE "statuses" ALTER COLUMN "stateId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "statuses" ADD CONSTRAINT "FK_931957ca4031e541303d515ecf6" FOREIGN KEY ("stateId") REFERENCES "state"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP TABLE "dispositions"`);
    }

}
