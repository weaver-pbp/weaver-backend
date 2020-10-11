import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserPassword1602436844678 implements MigrationInterface {
    name = "AddUserPassword1602436844678";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            "ALTER TABLE `user` ADD `passwordHash` varchar(255) NOT NULL"
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            "ALTER TABLE `user` DROP COLUMN `passwordHash`"
        );
    }
}
