import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import User from "user/user.entity";
import Game from "./game.entity";

@Injectable()
export class GameService {
    constructor(
        @InjectRepository(Game)
        private readonly gameRepository: Repository<Game>
    ) {}

    async getGamesOwnedBy(owner: User) {
        const games = this.gameRepository.find({
            where: {
                owner_id: owner.id,
            },
            relations: ["gms", "players"],
        });

        return games;
    }

    async createGame(owner: User, name: string, description: string) {
        const game = this.gameRepository.create({
            owner,
            name,
            description,
        });

        const result = await this.gameRepository.save(game);
        return result;
    }
}
