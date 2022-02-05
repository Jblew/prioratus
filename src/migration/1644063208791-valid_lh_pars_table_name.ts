import { MigrationInterface, QueryRunner } from "typeorm";

export class validLhParsTableName1644063208791 implements MigrationInterface {
  name = "validLhParsTableName1644063208791";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "liturgia_horarum_pars_user_config" ("userEmail" character varying NOT NULL, "parsSlug" character varying NOT NULL, "enabled" boolean NOT NULL, "hour" TIMESTAMP NOT NULL, PRIMARY KEY ("userEmail"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "anotherField"`);
  }
}
