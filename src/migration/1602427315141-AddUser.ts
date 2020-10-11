import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUser1602427315141 implements MigrationInterface {
    name = "AddUser1602427315141";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            "CREATE TABLE `user` (`uid` binary(16) NOT NULL, `username` varchar(255) NOT NULL, `tag` int NOT NULL, `email` varchar(255) NOT NULL, UNIQUE INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`), UNIQUE INDEX `IDX_f46a6ca4a887719d30670f65bc` (`username`, `tag`), PRIMARY KEY (`uid`)) ENGINE=InnoDB"
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            "DROP INDEX `IDX_f46a6ca4a887719d30670f65bc` ON `user`"
        );
        await queryRunner.query(
            "DROP INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` ON `user`"
        );
        await queryRunner.query("DROP TABLE `user`");
    }
}
