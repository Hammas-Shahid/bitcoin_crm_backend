import { MigrationInterface, QueryRunner } from "typeorm";

export class StatusAndBusinessTypeRelationWithUser1718206009273 implements MigrationInterface {
    name = 'StatusAndBusinessTypeRelationWithUser1718206009273'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "business_type" ADD CONSTRAINT "FK_1d98619d0191fd74b3e95661cfe" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "statuses" ADD CONSTRAINT "FK_bb447f8ff90fdcad0791fb87917" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "statuses" DROP CONSTRAINT "FK_bb447f8ff90fdcad0791fb87917"`);
        await queryRunner.query(`ALTER TABLE "business_type" DROP CONSTRAINT "FK_1d98619d0191fd74b3e95661cfe"`);
    }

}
