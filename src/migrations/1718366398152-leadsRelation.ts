import { MigrationInterface, QueryRunner } from "typeorm";

export class LeadsRelation1718366398152 implements MigrationInterface {
    name = 'LeadsRelation1718366398152'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lead" ADD "state" character varying`);
        await queryRunner.query(`ALTER TABLE "lead" ADD "saleMadeById" integer`);
        await queryRunner.query(`ALTER TABLE "lead_contract" ADD CONSTRAINT "UQ_4152a06e771d77d1e58b68b4b4e" UNIQUE ("leadId")`);
        await queryRunner.query(`ALTER TABLE "lead" DROP CONSTRAINT "FK_1105241a7fe81d294844feace28"`);
        await queryRunner.query(`ALTER TABLE "lead" DROP CONSTRAINT "FK_a5fa2df0cee6769fa270a4b0d8f"`);
        await queryRunner.query(`ALTER TABLE "lead" DROP CONSTRAINT "FK_a1589d9589bfb0380ea2be6f84d"`);
        await queryRunner.query(`ALTER TABLE "lead" ALTER COLUMN "businessTypeId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "lead" ALTER COLUMN "city" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "lead" ALTER COLUMN "zipCode" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "lead" ALTER COLUMN "email" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "lead" ALTER COLUMN "assigneeId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "lead" ALTER COLUMN "statusId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "notes" ADD CONSTRAINT "FK_b86c5f2b5de1e7a3d2a428cfb55" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lead_contract" ADD CONSTRAINT "FK_4152a06e771d77d1e58b68b4b4e" FOREIGN KEY ("leadId") REFERENCES "lead"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lead" ADD CONSTRAINT "FK_c80a9e90c20d68a23f92fd439ff" FOREIGN KEY ("saleMadeById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lead" ADD CONSTRAINT "FK_a5fa2df0cee6769fa270a4b0d8f" FOREIGN KEY ("assigneeId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lead" ADD CONSTRAINT "FK_1105241a7fe81d294844feace28" FOREIGN KEY ("businessTypeId") REFERENCES "business_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lead" ADD CONSTRAINT "FK_a1589d9589bfb0380ea2be6f84d" FOREIGN KEY ("statusId") REFERENCES "statuses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lead" DROP CONSTRAINT "FK_a1589d9589bfb0380ea2be6f84d"`);
        await queryRunner.query(`ALTER TABLE "lead" DROP CONSTRAINT "FK_1105241a7fe81d294844feace28"`);
        await queryRunner.query(`ALTER TABLE "lead" DROP CONSTRAINT "FK_a5fa2df0cee6769fa270a4b0d8f"`);
        await queryRunner.query(`ALTER TABLE "lead" DROP CONSTRAINT "FK_c80a9e90c20d68a23f92fd439ff"`);
        await queryRunner.query(`ALTER TABLE "lead_contract" DROP CONSTRAINT "FK_4152a06e771d77d1e58b68b4b4e"`);
        await queryRunner.query(`ALTER TABLE "notes" DROP CONSTRAINT "FK_b86c5f2b5de1e7a3d2a428cfb55"`);
        await queryRunner.query(`ALTER TABLE "lead" ALTER COLUMN "statusId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "lead" ALTER COLUMN "assigneeId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "lead" ALTER COLUMN "email" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "lead" ALTER COLUMN "zipCode" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "lead" ALTER COLUMN "city" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "lead" ALTER COLUMN "businessTypeId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "lead" ADD CONSTRAINT "FK_a1589d9589bfb0380ea2be6f84d" FOREIGN KEY ("statusId") REFERENCES "statuses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lead" ADD CONSTRAINT "FK_a5fa2df0cee6769fa270a4b0d8f" FOREIGN KEY ("assigneeId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lead" ADD CONSTRAINT "FK_1105241a7fe81d294844feace28" FOREIGN KEY ("businessTypeId") REFERENCES "business_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lead_contract" DROP CONSTRAINT "UQ_4152a06e771d77d1e58b68b4b4e"`);
        await queryRunner.query(`ALTER TABLE "lead" DROP COLUMN "saleMadeById"`);
        await queryRunner.query(`ALTER TABLE "lead" DROP COLUMN "state"`);
    }

}
