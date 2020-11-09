import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import User from "user/user.entity";
import Game from "./game.entity";

@Entity()
export default class Player {
    @ManyToOne(type => Game)
    @JoinColumn({ name: "game_id" })
    public game: Game;

    @Column({ primary: true })
    public game_id: string;

    @ManyToOne(type => User)
    @JoinColumn({ name: "user_id" })
    public user: User;

    @Column({ primary: true })
    public user_id: string;
}
