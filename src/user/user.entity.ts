import { ApiProperty } from "@nestjs/swagger";
import CommonEntity from "common/entity/common.entity";
import { Entity, Column, Index } from "typeorm";

@Entity()
@Index(["username", "tag"], { unique: true })
export default class User extends CommonEntity {
    @Column()
    @ApiProperty()
    public username: string;

    @Column()
    @ApiProperty()
    public tag: number;

    @Column({ unique: true })
    @ApiProperty()
    public email: string;

    @Column({ select: false })
    public passwordHash: string;
}
