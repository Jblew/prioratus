import {MigrationInterface, QueryRunner} from "typeorm";

export class message1644180789974 implements MigrationInterface {
    name = 'message1644180789974'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "message" ("ID" uuid NOT NULL DEFAULT uuid_generate_v4(), "time" TIMESTAMP NOT NULL DEFAULT now(), "text" text NOT NULL, "providerID" character varying NOT NULL, "direction" character varying NOT NULL, "accountID" uuid, CONSTRAINT "PK_584c90ad4c0fef7513c5917fc00" PRIMARY KEY ("ID"))`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_25c6155926edec870f2f989010e" FOREIGN KEY ("accountID") REFERENCES "account"("ID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_25c6155926edec870f2f989010e"`);
        await queryRunner.query(`DROP TABLE "message"`);
    }

}
