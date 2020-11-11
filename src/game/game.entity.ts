import { UUIDColumn } from "common/decorators/uuid-column.decorator";
import CommonEntity from "common/entity/common.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import User from "user/user.entity";
import GM from "./gm.entity";
import Player from "./player.entity";

@Entity()
export default class Game extends CommonEntity {
    @ManyToOne(type => User, { eager: true })
    @JoinColumn({ name: "owner_id" })
    public owner: User;

    @UUIDColumn({ select: false })
    private owner_id: string;

    @Column({ length: 50 })
    public name: string;

    @Column({ length: 1024 })
    public description: string;

    @OneToMany(
        type => GM,
        gm => gm.game
    )
    public gms: GM[];

    @OneToMany(
        type => Player,
        player => player.game
    )
    public players: Player[];
}
