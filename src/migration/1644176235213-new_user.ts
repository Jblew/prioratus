import {MigrationInterface, QueryRunner} from "typeorm";

export class newUser1644176235213 implements MigrationInterface {
    name = 'newUser1644176235213'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "liturgia_horarum_pars_user_settings" ("id" SERIAL NOT NULL, "userEmail" character varying NOT NULL, "parsSlug" character varying NOT NULL, "enabled" boolean NOT NULL, "hour" TIMESTAMP NOT NULL, CONSTRAINT "PK_119b33dc7344f39b3d23f646ea2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "age" integer NOT NULL, "anotherField" integer NOT NULL DEFAULT '2', CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "liturgia_horarum_pars_user_settings"`);
    }

}
