import { MigrationInterface, QueryRunner } from "typeorm";

export class AddGameInviteToken1605980468068 implements MigrationInterface {
    name = "AddGameInviteToken1605980468068";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            "CREATE TABLE `invite_token` (`token` char(10) NOT NULL, `game_id` binary(16) NOT NULL, `expires` date NOT NULL, `valid` tinyint NOT NULL, `forGM` tinyint NOT NULL, PRIMARY KEY (`token`)) ENGINE=InnoDB"
        );
        await queryRunner.query(
            "ALTER TABLE `invite_token` ADD CONSTRAINT `FK_9644fa0592d1d49ab6e0ba5aebe` FOREIGN KEY (`game_id`) REFERENCES `game`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION"
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            "ALTER TABLE `invite_token` DROP FOREIGN KEY `FK_9644fa0592d1d49ab6e0ba5aebe`"
        );
        await queryRunner.query("DROP TABLE `invite_token`");
    }
}
