import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GameController } from "./game.controller";
import Game from "./game.entity";
import InviteToken from "./invite-token.entity";
import GM from "./gm.entity";
import Player from "./player.entity";
import { GameService } from "./game.service";

@Module({
    imports: [TypeOrmModule.forFeature([Game, InviteToken, GM, Player])],
    providers: [GameService],
    exports: [],
    controllers: [GameController],
})
export class GameModule {}
