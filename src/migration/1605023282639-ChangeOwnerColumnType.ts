import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeOwnerColumnType1605023282639 implements MigrationInterface {
    name = 'ChangeOwnerColumnType1605023282639'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `game` DROP FOREIGN KEY `FK_d05575b5a28ec6dad65c2aef301`");
        await queryRunner.query("ALTER TABLE `game` CHANGE `ownerId` `owner_id` binary(16) NULL");
        await queryRunner.query("ALTER TABLE `game` CHANGE `owner_id` `owner_id` binary(16) NOT NULL");
        await queryRunner.query("ALTER TABLE `game` ADD CONSTRAINT `FK_678fcc30dbaf1c4c7e86bc10d16` FOREIGN KEY (`owner_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `game` DROP FOREIGN KEY `FK_678fcc30dbaf1c4c7e86bc10d16`");
        await queryRunner.query("ALTER TABLE `game` CHANGE `owner_id` `owner_id` binary(16) NULL");
        await queryRunner.query("ALTER TABLE `game` CHANGE `owner_id` `ownerId` binary(16) NULL");
        await queryRunner.query("ALTER TABLE `game` ADD CONSTRAINT `FK_d05575b5a28ec6dad65c2aef301` FOREIGN KEY (`ownerId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

}
