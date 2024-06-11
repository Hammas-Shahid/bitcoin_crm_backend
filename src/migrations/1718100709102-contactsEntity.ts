import { MigrationInterface, QueryRunner } from "typeorm";

export class ContactsEntity1718100709102 implements MigrationInterface {
    name = 'ContactsEntity1718100709102'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "contacts" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer NOT NULL DEFAULT '1', "updated_by" integer, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "phoneNumbers" jsonb NOT NULL, "emailAddresses" jsonb NOT NULL, "notes" character varying NOT NULL, CONSTRAINT "PK_b99cd40cfd66a99f1571f4f72e6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contacts_leads_lead" ("contactsId" integer NOT NULL, "leadId" integer NOT NULL, CONSTRAINT "PK_30eab2f870375e60736081d6751" PRIMARY KEY ("contactsId", "leadId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5bcdbb67118a7bc27b53eed9b7" ON "contacts_leads_lead" ("contactsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_66bafafb26890acb14e6ccd7c0" ON "contacts_leads_lead" ("leadId") `);
        await queryRunner.query(`ALTER TABLE "business_type" ADD CONSTRAINT "UQ_3380c75b13b1e097e3285cc8d08" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "contacts_leads_lead" ADD CONSTRAINT "FK_5bcdbb67118a7bc27b53eed9b74" FOREIGN KEY ("contactsId") REFERENCES "contacts"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "contacts_leads_lead" ADD CONSTRAINT "FK_66bafafb26890acb14e6ccd7c0d" FOREIGN KEY ("leadId") REFERENCES "lead"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contacts_leads_lead" DROP CONSTRAINT "FK_66bafafb26890acb14e6ccd7c0d"`);
        await queryRunner.query(`ALTER TABLE "contacts_leads_lead" DROP CONSTRAINT "FK_5bcdbb67118a7bc27b53eed9b74"`);
        await queryRunner.query(`ALTER TABLE "business_type" DROP CONSTRAINT "UQ_3380c75b13b1e097e3285cc8d08"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_66bafafb26890acb14e6ccd7c0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5bcdbb67118a7bc27b53eed9b7"`);
        await queryRunner.query(`DROP TABLE "contacts_leads_lead"`);
        await queryRunner.query(`DROP TABLE "contacts"`);
    }

}
