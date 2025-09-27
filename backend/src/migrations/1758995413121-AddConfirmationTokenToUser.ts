import { MigrationInterface, QueryRunner } from "typeorm";

export class AddConfirmationTokenToUser1758995413121 implements MigrationInterface {
    name = 'AddConfirmationTokenToUser1758995413121'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "confirmation_token" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "confirmation_token"`);
    }

}
