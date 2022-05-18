import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1644180168358 implements MigrationInterface {
    name = 'initial1644180168358'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("ID" uuid NOT NULL DEFAULT uuid_generate_v4(), "displayName" character varying NOT NULL, "email" character varying NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f0eace201126c1c8be2ae32fd22" PRIMARY KEY ("ID"))`);
        await queryRunner.query(`CREATE TABLE "account" ("ID" uuid NOT NULL DEFAULT uuid_generate_v4(), "providerID" character varying NOT NULL, "userID" uuid, CONSTRAINT "PK_05f931c9188bdf34110db3d42cb" PRIMARY KEY ("ID"))`);
        await queryRunner.query(`ALTER TABLE "account" ADD CONSTRAINT "FK_ac3fed11280c0a797f5ed4d6cc7" FOREIGN KEY ("userID") REFERENCES "user"("ID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" DROP CONSTRAINT "FK_ac3fed11280c0a797f5ed4d6cc7"`);
        await queryRunner.query(`DROP TABLE "account"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
