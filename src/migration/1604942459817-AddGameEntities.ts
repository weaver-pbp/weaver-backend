import { MigrationInterface, QueryRunner } from "typeorm";

export class AddGameEntities1604942459817 implements MigrationInterface {
    name = "AddGameEntities1604942459817";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            "CREATE TABLE `game` (`id` binary(16) NOT NULL, `name` varchar(50) NOT NULL, `description` varchar(1024) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB"
        );
        await queryRunner.query(
            "CREATE TABLE `gm` (`game_id` binary NOT NULL, `user_id` binary NOT NULL, PRIMARY KEY (`game_id`, `user_id`)) ENGINE=InnoDB"
        );
        await queryRunner.query(
            "CREATE TABLE `player` (`game_id` binary NOT NULL, `user_id` binary NOT NULL, PRIMARY KEY (`game_id`, `user_id`)) ENGINE=InnoDB"
        );
        await queryRunner.query(
            "ALTER TABLE `gm` ADD CONSTRAINT `FK_f51bbc19c2dda02faa52048c052` FOREIGN KEY (`game_id`) REFERENCES `game`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION"
        );
        await queryRunner.query(
            "ALTER TABLE `gm` ADD CONSTRAINT `FK_6777b74ecd80d7a8ec70daec56e` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION"
        );
        await queryRunner.query(
            "ALTER TABLE `player` ADD CONSTRAINT `FK_433f544c592c2b6cbdfd2edbec3` FOREIGN KEY (`game_id`) REFERENCES `game`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION"
        );
        await queryRunner.query(
            "ALTER TABLE `player` ADD CONSTRAINT `FK_d04e64fc9b7fd372000c0dfda3f` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION"
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            "ALTER TABLE `player` DROP FOREIGN KEY `FK_d04e64fc9b7fd372000c0dfda3f`"
        );
        await queryRunner.query(
            "ALTER TABLE `player` DROP FOREIGN KEY `FK_433f544c592c2b6cbdfd2edbec3`"
        );
        await queryRunner.query(
            "ALTER TABLE `gm` DROP FOREIGN KEY `FK_6777b74ecd80d7a8ec70daec56e`"
        );
        await queryRunner.query(
            "ALTER TABLE `gm` DROP FOREIGN KEY `FK_f51bbc19c2dda02faa52048c052`"
        );
        await queryRunner.query("DROP TABLE `player`");
        await queryRunner.query("DROP TABLE `gm`");
        await queryRunner.query("DROP TABLE `game`");
    }
}
