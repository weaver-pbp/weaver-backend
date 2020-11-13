import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import User from "user/user.entity";
import Game from "./game.entity";
import GM from "./gm.entity";
import * as uuid from "uuid";

@Injectable()
export class GameService {
    constructor(
        @InjectRepository(Game)
        private readonly gameRepository: Repository<Game>
    ) {}

    async getGamesOwnedBy(owner: User) {
        const games = await this.gameRepository.find({
            where: {
                owner_id: owner.id,
            },
            relations: ["gms", "players"],
        });

        return games;
    }

    async getGamesIn(user: User) {
        const gamesQuery = await this.gameRepository
            .createQueryBuilder("game")
            .leftJoin("game.gms", "gm", "gm.user_id = :userId")
            .leftJoin("game.players", "player", "player.user_id = :userId")
            .where("gm.game_id is not null")
            .orWhere("player.game_id is not null")
            .setParameter("userId", Buffer.from(uuid.parse(user.id)));

        const games = gamesQuery.getMany();

        return games;
    }

    async getGameById(id: string) {
        try {
            const game = await this.gameRepository.findOneOrFail(id, {
                relations: ["owner", "players", "gms"],
            });

            return game;
        } catch (e) {
            throw new HttpException("Game not found.", HttpStatus.NOT_FOUND);
        }
    }

    async createGame(owner: User, name: string, description: string) {
        const game = this.gameRepository.create({
            owner,
            name,
            description,
            gms: [new GM({ user: owner })],
        });

        const result = await this.gameRepository.save(game);
        return result;
    }
}
