import { ApiProperty } from "@nestjs/swagger";
import { UUIDColumn } from "common/decorators/uuid-column.decorator";
import { Entity, Column, BeforeInsert, Index } from "typeorm";
import * as uuid from "uuid";

@Entity()
@Index(["username", "tag"], { unique: true })
export default class User {
    @UUIDColumn()
    @ApiProperty()
    public uid: string;

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

    @BeforeInsert()
    generateUID() {
        if (!this.uid) {
            this.uid = uuid.v4();
        }
    }
}
