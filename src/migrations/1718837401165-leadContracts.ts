import { MigrationInterface, QueryRunner } from "typeorm";

export class LeadContracts1718837401165 implements MigrationInterface {
    name = 'LeadContracts1718837401165'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "business_type" DROP CONSTRAINT "FK_1d98619d0191fd74b3e95661cfe"`);
        await queryRunner.query(`ALTER TABLE "lead" DROP CONSTRAINT "FK_a5fa2df0cee6769fa270a4b0d8f"`);
        await queryRunner.query(`ALTER TABLE "statuses" DROP CONSTRAINT "FK_bb447f8ff90fdcad0791fb87917"`);
        await queryRunner.query(`CREATE TABLE "lead_contract" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer NOT NULL DEFAULT '1', "updated_by" integer, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "rate" character varying NOT NULL, "durationInDays" integer NOT NULL, "signedDate" character varying NOT NULL, "scheduleDate" character varying NOT NULL, "installationDate" character varying NOT NULL, "leadId" integer NOT NULL, "serviceProviderId" integer NOT NULL, CONSTRAINT "REL_4152a06e771d77d1e58b68b4b4" UNIQUE ("leadId"), CONSTRAINT "PK_b97e6e8a19fbb28bfc475072146" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "lead" ADD "saleInfo" jsonb NOT NULL DEFAULT '{}'`);
        await queryRunner.query(`ALTER TABLE "lead" DROP CONSTRAINT "FK_a1589d9589bfb0380ea2be6f84d"`);
        await queryRunner.query(`ALTER TABLE "lead" ALTER COLUMN "city" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "lead" ALTER COLUMN "zipCode" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "lead" ALTER COLUMN "email" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "lead" ALTER COLUMN "statusId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "lead_contract" ADD CONSTRAINT "FK_b69e2ce4938ed1badb83eabbefe" FOREIGN KEY ("serviceProviderId") REFERENCES "service_provider"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "lead_contract" ADD CONSTRAINT "FK_4152a06e771d77d1e58b68b4b4e" FOREIGN KEY ("leadId") REFERENCES "lead"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "business_type" ADD CONSTRAINT "FK_1d98619d0191fd74b3e95661cfe" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "lead" ADD CONSTRAINT "FK_a5fa2df0cee6769fa270a4b0d8f" FOREIGN KEY ("assigneeId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "lead" ADD CONSTRAINT "FK_a1589d9589bfb0380ea2be6f84d" FOREIGN KEY ("statusId") REFERENCES "statuses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "statuses" ADD CONSTRAINT "FK_bb447f8ff90fdcad0791fb87917" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "statuses" DROP CONSTRAINT "FK_bb447f8ff90fdcad0791fb87917"`);
        await queryRunner.query(`ALTER TABLE "lead" DROP CONSTRAINT "FK_a1589d9589bfb0380ea2be6f84d"`);
        await queryRunner.query(`ALTER TABLE "lead" DROP CONSTRAINT "FK_a5fa2df0cee6769fa270a4b0d8f"`);
        await queryRunner.query(`ALTER TABLE "business_type" DROP CONSTRAINT "FK_1d98619d0191fd74b3e95661cfe"`);
        await queryRunner.query(`ALTER TABLE "lead_contract" DROP CONSTRAINT "FK_4152a06e771d77d1e58b68b4b4e"`);
        await queryRunner.query(`ALTER TABLE "lead_contract" DROP CONSTRAINT "FK_b69e2ce4938ed1badb83eabbefe"`);
        await queryRunner.query(`ALTER TABLE "lead" ALTER COLUMN "statusId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "lead" ALTER COLUMN "email" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "lead" ALTER COLUMN "zipCode" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "lead" ALTER COLUMN "city" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "lead" ADD CONSTRAINT "FK_a1589d9589bfb0380ea2be6f84d" FOREIGN KEY ("statusId") REFERENCES "statuses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lead" DROP COLUMN "saleInfo"`);
        await queryRunner.query(`DROP TABLE "lead_contract"`);
        await queryRunner.query(`ALTER TABLE "statuses" ADD CONSTRAINT "FK_bb447f8ff90fdcad0791fb87917" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "lead" ADD CONSTRAINT "FK_a5fa2df0cee6769fa270a4b0d8f" FOREIGN KEY ("assigneeId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "business_type" ADD CONSTRAINT "FK_1d98619d0191fd74b3e95661cfe" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
