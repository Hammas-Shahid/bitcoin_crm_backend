import { MigrationInterface, QueryRunner } from "typeorm";

export class ServiceProviderEntity1718270871015 implements MigrationInterface {
    name = 'ServiceProviderEntity1718270871015'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "business_type" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer NOT NULL DEFAULT '1', "updated_by" integer, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, CONSTRAINT "UQ_3380c75b13b1e097e3285cc8d08" UNIQUE ("name"), CONSTRAINT "PK_dcc57dda934350221e1ff807bfa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "state" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer NOT NULL DEFAULT '1', "updated_by" integer, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, CONSTRAINT "UQ_b2c4aef5929860729007ac32f6f" UNIQUE ("name"), CONSTRAINT "PK_549ffd046ebab1336c3a8030a12" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "statuses" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer NOT NULL DEFAULT '1', "updated_by" integer, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "stateId" integer NOT NULL, CONSTRAINT "UQ_037e43ea842b18ce4e5f4dcfd06" UNIQUE ("name"), CONSTRAINT "PK_2fd3770acdb67736f1a3e3d5399" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contacts" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer NOT NULL DEFAULT '1', "updated_by" integer, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "phoneNumbers" jsonb NOT NULL, "emailAddresses" jsonb NOT NULL, "notes" character varying NOT NULL, CONSTRAINT "PK_b99cd40cfd66a99f1571f4f72e6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "lead_contact" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer NOT NULL DEFAULT '1', "updated_by" integer, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "leadId" integer NOT NULL, "contactId" integer NOT NULL, CONSTRAINT "PK_0bd59c5be16d19ab0f926149228" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "dispositions" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer NOT NULL DEFAULT '1', "updated_by" integer, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, CONSTRAINT "UQ_5eae48b4336c4a5260b8e65c978" UNIQUE ("name"), CONSTRAINT "PK_910039d536836fd1ec73c6d7424" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "lead_call" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer NOT NULL DEFAULT '1', "updated_by" integer, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "duration" character varying NOT NULL, "comment" character varying NOT NULL, "dispositionId" integer NOT NULL, "leadId" integer NOT NULL, CONSTRAINT "PK_b38b3c5ef2af834b9fd28fb4c9c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "lead_call_back" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer NOT NULL DEFAULT '1', "updated_by" integer, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "date" character varying NOT NULL, "time" character varying NOT NULL, "comment" character varying NOT NULL, "leadId" integer NOT NULL, CONSTRAINT "PK_81293867d18cdb237caf71cef6b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "lead" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer NOT NULL DEFAULT '1', "updated_by" integer, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "businessName" character varying NOT NULL, "businessTypeId" integer NOT NULL, "address" character varying NOT NULL, "city" character varying NOT NULL, "zipCode" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "email" character varying NOT NULL, "assigneeId" integer NOT NULL, "statusId" integer NOT NULL, CONSTRAINT "UQ_7686d7f1326b65108e731dc50cc" UNIQUE ("address"), CONSTRAINT "PK_ca96c1888f7dcfccab72b72fffa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "service_provider" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer NOT NULL DEFAULT '1', "updated_by" integer, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, CONSTRAINT "UQ_37defea6f0b0e741fe5d1701ff9" UNIQUE ("name"), CONSTRAINT "PK_7610a92ca242cb29d96009caa19" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer NOT NULL DEFAULT '1', "updated_by" integer, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "failed_attempts" integer NOT NULL DEFAULT '0', CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "business_type" ADD CONSTRAINT "FK_1d98619d0191fd74b3e95661cfe" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "statuses" ADD CONSTRAINT "FK_931957ca4031e541303d515ecf6" FOREIGN KEY ("stateId") REFERENCES "state"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "statuses" ADD CONSTRAINT "FK_bb447f8ff90fdcad0791fb87917" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "lead_contact" ADD CONSTRAINT "FK_60f49e5b103f2676e2a71974820" FOREIGN KEY ("leadId") REFERENCES "lead"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "lead_contact" ADD CONSTRAINT "FK_95fe95c50e6e0b167f4fd436991" FOREIGN KEY ("contactId") REFERENCES "contacts"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "dispositions" ADD CONSTRAINT "FK_c4eeef3d2f51353ecff8942f96d" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "lead_call" ADD CONSTRAINT "FK_4babe2149824ea9d8b164d00163" FOREIGN KEY ("leadId") REFERENCES "lead"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "lead_call" ADD CONSTRAINT "FK_fb7843b1e046a1f1e1e604520dc" FOREIGN KEY ("dispositionId") REFERENCES "dispositions"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "lead_call_back" ADD CONSTRAINT "FK_6be83f6bbbee0311f1b11d8072c" FOREIGN KEY ("leadId") REFERENCES "lead"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "lead" ADD CONSTRAINT "FK_a5fa2df0cee6769fa270a4b0d8f" FOREIGN KEY ("assigneeId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lead" ADD CONSTRAINT "FK_1105241a7fe81d294844feace28" FOREIGN KEY ("businessTypeId") REFERENCES "business_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lead" ADD CONSTRAINT "FK_a1589d9589bfb0380ea2be6f84d" FOREIGN KEY ("statusId") REFERENCES "statuses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "service_provider" ADD CONSTRAINT "FK_0070ad48b6124e833706ab75ec0" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "service_provider" DROP CONSTRAINT "FK_0070ad48b6124e833706ab75ec0"`);
        await queryRunner.query(`ALTER TABLE "lead" DROP CONSTRAINT "FK_a1589d9589bfb0380ea2be6f84d"`);
        await queryRunner.query(`ALTER TABLE "lead" DROP CONSTRAINT "FK_1105241a7fe81d294844feace28"`);
        await queryRunner.query(`ALTER TABLE "lead" DROP CONSTRAINT "FK_a5fa2df0cee6769fa270a4b0d8f"`);
        await queryRunner.query(`ALTER TABLE "lead_call_back" DROP CONSTRAINT "FK_6be83f6bbbee0311f1b11d8072c"`);
        await queryRunner.query(`ALTER TABLE "lead_call" DROP CONSTRAINT "FK_fb7843b1e046a1f1e1e604520dc"`);
        await queryRunner.query(`ALTER TABLE "lead_call" DROP CONSTRAINT "FK_4babe2149824ea9d8b164d00163"`);
        await queryRunner.query(`ALTER TABLE "dispositions" DROP CONSTRAINT "FK_c4eeef3d2f51353ecff8942f96d"`);
        await queryRunner.query(`ALTER TABLE "lead_contact" DROP CONSTRAINT "FK_95fe95c50e6e0b167f4fd436991"`);
        await queryRunner.query(`ALTER TABLE "lead_contact" DROP CONSTRAINT "FK_60f49e5b103f2676e2a71974820"`);
        await queryRunner.query(`ALTER TABLE "statuses" DROP CONSTRAINT "FK_bb447f8ff90fdcad0791fb87917"`);
        await queryRunner.query(`ALTER TABLE "statuses" DROP CONSTRAINT "FK_931957ca4031e541303d515ecf6"`);
        await queryRunner.query(`ALTER TABLE "business_type" DROP CONSTRAINT "FK_1d98619d0191fd74b3e95661cfe"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "service_provider"`);
        await queryRunner.query(`DROP TABLE "lead"`);
        await queryRunner.query(`DROP TABLE "lead_call_back"`);
        await queryRunner.query(`DROP TABLE "lead_call"`);
        await queryRunner.query(`DROP TABLE "dispositions"`);
        await queryRunner.query(`DROP TABLE "lead_contact"`);
        await queryRunner.query(`DROP TABLE "contacts"`);
        await queryRunner.query(`DROP TABLE "statuses"`);
        await queryRunner.query(`DROP TABLE "state"`);
        await queryRunner.query(`DROP TABLE "business_type"`);
    }

}
