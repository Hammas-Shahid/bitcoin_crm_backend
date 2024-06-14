import { MigrationInterface, QueryRunner } from "typeorm";

export class LeadStateColumn1718294751953 implements MigrationInterface {
    name = 'LeadStateColumn1718294751953'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lead" ADD "state" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lead" DROP COLUMN "state"`);
    }

}
