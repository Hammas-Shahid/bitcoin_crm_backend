import { MigrationInterface, QueryRunner } from "typeorm";

export class ServiceProviderEntity1718271266020 implements MigrationInterface {
    name = 'ServiceProviderEntity1718271266020'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lead_call" DROP CONSTRAINT "FK_4016097fe35a78ee061125b3338"`);
        await queryRunner.query(`CREATE TABLE "service_provider" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer NOT NULL DEFAULT '1', "updated_by" integer, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, CONSTRAINT "UQ_37defea6f0b0e741fe5d1701ff9" UNIQUE ("name"), CONSTRAINT "PK_7610a92ca242cb29d96009caa19" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "lead_call" DROP COLUMN "callDispositionId"`);
        await queryRunner.query(`ALTER TABLE "service_provider" ADD CONSTRAINT "FK_0070ad48b6124e833706ab75ec0" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "service_provider" DROP CONSTRAINT "FK_0070ad48b6124e833706ab75ec0"`);
        await queryRunner.query(`ALTER TABLE "lead_call" ADD "callDispositionId" integer NOT NULL`);
        await queryRunner.query(`DROP TABLE "service_provider"`);
        await queryRunner.query(`ALTER TABLE "lead_call" ADD CONSTRAINT "FK_4016097fe35a78ee061125b3338" FOREIGN KEY ("callDispositionId") REFERENCES "dispositions"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
