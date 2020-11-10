import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameUID1605020727387 implements MigrationInterface {
    name = "RenameUID1605020727387";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            "ALTER TABLE `user` CHANGE `uid` `id` binary(16) NOT NULL"
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            "ALTER TABLE `user` CHANGE `id` `uid` binary(16) NOT NULL"
        );
    }
}
