import { ApiProperty } from "@nestjs/swagger";
import {
    Entity,
    Unique,
    Column,
    PrimaryColumn,
    BeforeInsert,
    getManager,
} from "typeorm";
import * as uuid from "uuid";

@Entity()
@Unique(["username", "tag"])
export default class User {
    @PrimaryColumn({
        type: "binary",
        length: 16,
        transformer: {
            from: dbValue => uuid.stringify(dbValue),
            to: entityValue => Buffer.from(uuid.parse(entityValue)),
        },
    })
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

    @BeforeInsert()
    async generateTag() {
        if (!this.tag) {
            const userRepository = getManager().getRepository(User);

            do {
                this.tag = Math.floor(Math.random() * 9999);
            } while (
                await userRepository.findOne({
                    where: { username: this.username, tag: this.tag },
                })
            );
        }
    }
}
