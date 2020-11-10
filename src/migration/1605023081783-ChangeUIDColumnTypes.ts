import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeUIDColumnTypes1605023081783 implements MigrationInterface {
    name = 'ChangeUIDColumnTypes1605023081783'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `gm` DROP FOREIGN KEY `FK_f51bbc19c2dda02faa52048c052`");
        await queryRunner.query("ALTER TABLE `gm` DROP FOREIGN KEY `FK_6777b74ecd80d7a8ec70daec56e`");
        await queryRunner.query("ALTER TABLE `gm` DROP PRIMARY KEY");
        await queryRunner.query("ALTER TABLE `gm` ADD PRIMARY KEY (`user_id`)");
        await queryRunner.query("ALTER TABLE `gm` DROP COLUMN `game_id`");
        await queryRunner.query("ALTER TABLE `gm` ADD `game_id` binary(16) NOT NULL");
        await queryRunner.query("ALTER TABLE `gm` DROP PRIMARY KEY");
        await queryRunner.query("ALTER TABLE `gm` ADD PRIMARY KEY (`user_id`, `game_id`)");
        await queryRunner.query("ALTER TABLE `gm` DROP PRIMARY KEY");
        await queryRunner.query("ALTER TABLE `gm` ADD PRIMARY KEY (`game_id`)");
        await queryRunner.query("ALTER TABLE `gm` DROP COLUMN `user_id`");
        await queryRunner.query("ALTER TABLE `gm` ADD `user_id` binary(16) NOT NULL");
        await queryRunner.query("ALTER TABLE `gm` DROP PRIMARY KEY");
        await queryRunner.query("ALTER TABLE `gm` ADD PRIMARY KEY (`game_id`, `user_id`)");
        await queryRunner.query("ALTER TABLE `player` DROP FOREIGN KEY `FK_433f544c592c2b6cbdfd2edbec3`");
        await queryRunner.query("ALTER TABLE `player` DROP FOREIGN KEY `FK_d04e64fc9b7fd372000c0dfda3f`");
        await queryRunner.query("ALTER TABLE `player` DROP PRIMARY KEY");
        await queryRunner.query("ALTER TABLE `player` ADD PRIMARY KEY (`user_id`)");
        await queryRunner.query("ALTER TABLE `player` DROP COLUMN `game_id`");
        await queryRunner.query("ALTER TABLE `player` ADD `game_id` binary(16) NOT NULL");
        await queryRunner.query("ALTER TABLE `player` DROP PRIMARY KEY");
        await queryRunner.query("ALTER TABLE `player` ADD PRIMARY KEY (`user_id`, `game_id`)");
        await queryRunner.query("ALTER TABLE `player` DROP PRIMARY KEY");
        await queryRunner.query("ALTER TABLE `player` ADD PRIMARY KEY (`game_id`)");
        await queryRunner.query("ALTER TABLE `player` DROP COLUMN `user_id`");
        await queryRunner.query("ALTER TABLE `player` ADD `user_id` binary(16) NOT NULL");
        await queryRunner.query("ALTER TABLE `player` DROP PRIMARY KEY");
        await queryRunner.query("ALTER TABLE `player` ADD PRIMARY KEY (`game_id`, `user_id`)");
        await queryRunner.query("ALTER TABLE `gm` ADD CONSTRAINT `FK_f51bbc19c2dda02faa52048c052` FOREIGN KEY (`game_id`) REFERENCES `game`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `gm` ADD CONSTRAINT `FK_6777b74ecd80d7a8ec70daec56e` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `player` ADD CONSTRAINT `FK_433f544c592c2b6cbdfd2edbec3` FOREIGN KEY (`game_id`) REFERENCES `game`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `player` ADD CONSTRAINT `FK_d04e64fc9b7fd372000c0dfda3f` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `player` DROP FOREIGN KEY `FK_d04e64fc9b7fd372000c0dfda3f`");
        await queryRunner.query("ALTER TABLE `player` DROP FOREIGN KEY `FK_433f544c592c2b6cbdfd2edbec3`");
        await queryRunner.query("ALTER TABLE `gm` DROP FOREIGN KEY `FK_6777b74ecd80d7a8ec70daec56e`");
        await queryRunner.query("ALTER TABLE `gm` DROP FOREIGN KEY `FK_f51bbc19c2dda02faa52048c052`");
        await queryRunner.query("ALTER TABLE `player` DROP PRIMARY KEY");
        await queryRunner.query("ALTER TABLE `player` ADD PRIMARY KEY (`game_id`)");
        await queryRunner.query("ALTER TABLE `player` DROP COLUMN `user_id`");
        await queryRunner.query("ALTER TABLE `player` ADD `user_id` binary(1) NOT NULL");
        await queryRunner.query("ALTER TABLE `player` DROP PRIMARY KEY");
        await queryRunner.query("ALTER TABLE `player` ADD PRIMARY KEY (`user_id`, `game_id`)");
        await queryRunner.query("ALTER TABLE `player` DROP PRIMARY KEY");
        await queryRunner.query("ALTER TABLE `player` ADD PRIMARY KEY (`user_id`)");
        await queryRunner.query("ALTER TABLE `player` DROP COLUMN `game_id`");
        await queryRunner.query("ALTER TABLE `player` ADD `game_id` binary(1) NOT NULL");
        await queryRunner.query("ALTER TABLE `player` DROP PRIMARY KEY");
        await queryRunner.query("ALTER TABLE `player` ADD PRIMARY KEY (`game_id`, `user_id`)");
        await queryRunner.query("ALTER TABLE `player` ADD CONSTRAINT `FK_d04e64fc9b7fd372000c0dfda3f` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `player` ADD CONSTRAINT `FK_433f544c592c2b6cbdfd2edbec3` FOREIGN KEY (`game_id`) REFERENCES `game`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `gm` DROP PRIMARY KEY");
        await queryRunner.query("ALTER TABLE `gm` ADD PRIMARY KEY (`game_id`)");
        await queryRunner.query("ALTER TABLE `gm` DROP COLUMN `user_id`");
        await queryRunner.query("ALTER TABLE `gm` ADD `user_id` binary(1) NOT NULL");
        await queryRunner.query("ALTER TABLE `gm` DROP PRIMARY KEY");
        await queryRunner.query("ALTER TABLE `gm` ADD PRIMARY KEY (`user_id`, `game_id`)");
        await queryRunner.query("ALTER TABLE `gm` DROP PRIMARY KEY");
        await queryRunner.query("ALTER TABLE `gm` ADD PRIMARY KEY (`user_id`)");
        await queryRunner.query("ALTER TABLE `gm` DROP COLUMN `game_id`");
        await queryRunner.query("ALTER TABLE `gm` ADD `game_id` binary(1) NOT NULL");
        await queryRunner.query("ALTER TABLE `gm` DROP PRIMARY KEY");
        await queryRunner.query("ALTER TABLE `gm` ADD PRIMARY KEY (`game_id`, `user_id`)");
        await queryRunner.query("ALTER TABLE `gm` ADD CONSTRAINT `FK_6777b74ecd80d7a8ec70daec56e` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `gm` ADD CONSTRAINT `FK_f51bbc19c2dda02faa52048c052` FOREIGN KEY (`game_id`) REFERENCES `game`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

}
