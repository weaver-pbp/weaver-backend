import { UUIDColumn } from "common/decorators/uuid-column.decorator";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import User from "user/user.entity";
import Game from "./game.entity";

@Entity()
export default class GM {
    @ManyToOne(
        type => Game,
        game => game.gms,
        { eager: true }
    )
    @JoinColumn({ name: "game_id" })
    public game: Game;

    @UUIDColumn({ primary: true, select: false })
    public game_id: string;

    @ManyToOne(type => User, { eager: true })
    @JoinColumn({ name: "user_id" })
    public user: User;

    @UUIDColumn({ primary: true, select: false })
    public user_id: string;
}
