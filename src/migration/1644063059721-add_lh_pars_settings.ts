import {MigrationInterface, QueryRunner} from "typeorm";

export class addLhParsSettings1644063059721 implements MigrationInterface {
    name = 'addLhParsSettings1644063059721'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "liturgia_horarum_pars_user_settings" ("id" SERIAL NOT NULL, "userEmail" character varying NOT NULL, "parsSlug" character varying NOT NULL, "enabled" boolean NOT NULL, "hour" TIMESTAMP NOT NULL, CONSTRAINT "PK_119b33dc7344f39b3d23f646ea2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD "anotherField" integer NOT NULL DEFAULT '2'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "anotherField"`);
        await queryRunner.query(`DROP TABLE "liturgia_horarum_pars_user_settings"`);
    }

}
