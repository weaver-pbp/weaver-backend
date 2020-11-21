import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import User from "user/user.entity";
import Game from "./game.entity";
import GM from "./gm.entity";
import * as uuid from "uuid";
import InviteToken from "./invite-token.entity";
import Player from "./player.entity";
import { LoggerService } from "logger/logger.service";

@Injectable()
export class GameService {
    constructor(
        @InjectRepository(Game)
        private readonly gameRepository: Repository<Game>,
        @InjectRepository(InviteToken)
        private readonly tokenRepository: Repository<InviteToken>,
        @InjectRepository(GM)
        private readonly gmRepository: Repository<GM>,
        @InjectRepository(Player)
        private readonly playerRepository: Repository<Player>,
        @Inject(LoggerService)
        private readonly loggerService: LoggerService
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

    async getGameById(id: string, userIn: User) {
        try {
            const game = await this.gameRepository.findOneOrFail(id, {
                relations: ["owner", "players", "gms"],
            });

            this.loggerService.log(JSON.stringify(game));

            if (
                game.gms.findIndex(gm => gm.user_id === userIn.id) === -1 &&
                game.players.findIndex(
                    player => player.user_id === userIn.id
                ) === -1
            ) {
                throw new Error("User does not have access to that game.");
            }

            return game;
        } catch (e) {
            throw new HttpException("Game not found.", HttpStatus.NOT_FOUND);
        }
    }

    async createInviteToken(game: Game, forGM: boolean) {
        try {
            const tokenObj = this.tokenRepository.create({
                game_id: game.id,
                forGM,
                valid: true,
            });

            const savedToken = await this.tokenRepository.save(tokenObj);

            return savedToken;
        } catch (e) {
            this.loggerService.error(e);
            throw new HttpException(
                "Could not create token.",
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    async getGameByToken(token: string) {
        try {
            const tokenObj = await this.tokenRepository.findOneOrFail(token, {
                relations: ["game"],
            });

            if (tokenObj.valid) {
                return tokenObj.game;
            }
        } catch (e) {
            throw new HttpException("Token was invalid.", HttpStatus.NOT_FOUND);
        }
    }

    async joinGameByToken(user: User, token: string) {
        try {
            const tokenObj = await this.tokenRepository.findOneOrFail(token, {
                relations: ["game"],
            });

            if (tokenObj.valid) {
                if (tokenObj.forGM) {
                    const gm = await this.gmRepository.create({
                        user,
                        game: tokenObj.game,
                    });

                    this.gmRepository.save(gm);
                } else {
                    const player = await this.playerRepository.create({
                        user,
                        game: tokenObj.game,
                    });

                    this.playerRepository.save(player);
                }
            }
        } catch (e) {
            throw new HttpException("Token was invalid.", HttpStatus.NOT_FOUND);
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
