import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1580667999530 implements MigrationInterface {
    name = 'Migration1580667999530'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "email"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "category" ADD "email" character varying`, undefined);
    }

}
