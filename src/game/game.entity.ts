import { UUIDColumn } from "common/decorators/uuid-column.decorator";
import CommonEntity from "common/entity/common.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToOne } from "typeorm";
import User from "user/user.entity";

@Entity()
export default class Game extends CommonEntity {
    @ManyToOne(type => User)
    @JoinColumn({ name: "owner_id" })
    public owner: User;

    @UUIDColumn()
    public owner_id: string;

    @Column({ length: 50 })
    public name: string;

    @Column({ length: 1024 })
    public description: string;
}
