import {MigrationInterface, QueryRunner} from "typeorm";

export class AddGameOwner1605022582977 implements MigrationInterface {
    name = 'AddGameOwner1605022582977'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `game` ADD `ownerId` binary(16) NULL");
        await queryRunner.query("ALTER TABLE `game` ADD CONSTRAINT `FK_d05575b5a28ec6dad65c2aef301` FOREIGN KEY (`ownerId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `game` DROP FOREIGN KEY `FK_d05575b5a28ec6dad65c2aef301`");
        await queryRunner.query("ALTER TABLE `game` DROP COLUMN `ownerId`");
    }

}
