import { MigrationInterface, QueryRunner } from "typeorm";

export class LeadsEntityStatus1718072366620 implements MigrationInterface {
    name = 'LeadsEntityStatus1718072366620'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lead" ADD "statusId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "lead" ADD CONSTRAINT "FK_a1589d9589bfb0380ea2be6f84d" FOREIGN KEY ("statusId") REFERENCES "statuses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lead" DROP CONSTRAINT "FK_a1589d9589bfb0380ea2be6f84d"`);
        await queryRunner.query(`ALTER TABLE "lead" DROP COLUMN "statusId"`);
    }

}
