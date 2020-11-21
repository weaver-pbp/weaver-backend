import { UUIDColumn } from "common/decorators/uuid-column.decorator";
import { randomBytes } from "crypto";
import {
    AfterLoad,
    BeforeInsert,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryColumn,
} from "typeorm";
import { randomBase64String } from "utils/random";
import Game from "./game.entity";

@Entity()
export default class InviteToken {
    @PrimaryColumn({
        type: "char",
        length: 10,
    })
    public token: string;

    @ManyToOne(type => Game)
    @JoinColumn({ name: "game_id" })
    public game: Game;

    @UUIDColumn({ select: false })
    public game_id: string;

    @Column("date")
    public expires: Date;

    @Column()
    public valid: boolean;

    @Column()
    public forGM: boolean;

    public constructor(game: Game) {
        this.game = game;
        this.generateToken();
    }

    @BeforeInsert()
    generateToken() {
        if (!this.token) {
            this.token = randomBase64String(10);
        }
        if (!this.expires) {
            const expires = new Date();
            expires.setDate(expires.getDate() + 7);
            this.expires = expires;
        }
    }

    @AfterLoad()
    validateTime() {
        if (this.valid && new Date() > this.expires) {
            this.valid = false;
        }
    }
}
