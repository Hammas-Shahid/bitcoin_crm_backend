import { MigrationInterface, QueryRunner } from "typeorm";

export class StateOnDeleteCascade1718068971852 implements MigrationInterface {
    name = 'StateOnDeleteCascade1718068971852'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "statuses" DROP CONSTRAINT "FK_931957ca4031e541303d515ecf6"`);
        await queryRunner.query(`ALTER TABLE "statuses" ADD CONSTRAINT "FK_931957ca4031e541303d515ecf6" FOREIGN KEY ("stateId") REFERENCES "state"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "statuses" DROP CONSTRAINT "FK_931957ca4031e541303d515ecf6"`);
        await queryRunner.query(`ALTER TABLE "statuses" ADD CONSTRAINT "FK_931957ca4031e541303d515ecf6" FOREIGN KEY ("stateId") REFERENCES "state"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
