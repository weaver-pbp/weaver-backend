import { ApiProperty } from "@nestjs/swagger";
import {
    Entity,
    Column,
    PrimaryColumn,
    BeforeInsert,
    getManager,
    BeforeUpdate,
    Not,
    FindOperator,
    Index,
} from "typeorm";
import * as uuid from "uuid";

@Entity()
@Index(["username", "tag"], { unique: true })
export default class User {
    @PrimaryColumn({
        type: "binary",
        length: 16,
        transformer: {
            from: dbValue => uuid.stringify(dbValue),
            to: entityValue => {
                if (entityValue instanceof FindOperator) {
                    return new FindOperator(
                        entityValue.type as any,
                        Buffer.from(uuid.parse(entityValue.value)),
                        entityValue.useParameter,
                        entityValue.multipleParameters
                    );
                } else {
                    return Buffer.from(uuid.parse(entityValue));
                }
            },
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
}
