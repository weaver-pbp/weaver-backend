import { Entity, Unique, Column, PrimaryColumn, BeforeInsert } from "typeorm";
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
    public uid: string;

    @Column()
    public username: string;

    @Column()
    public tag: number;

    @Column({ unique: true })
    public email: string;

    @BeforeInsert()
    generateUID() {
        if (!this.uid) {
            this.uid = uuid.v4();
        }
    }
}
