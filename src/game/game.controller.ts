import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { ApiNotFoundResponse, ApiOkResponse } from "@nestjs/swagger";
import { Auth } from "common/decorators/auth.decorator";
import { CurrentUser } from "common/decorators/current-user.decorator";
import { userInfo } from "os";
import User from "user/user.entity";
import { CreateGameDto } from "./dto/create-game.dto";
import Game from "./game.entity";
import { GameService } from "./game.service";

@Controller("games")
export class GameController {
    constructor(private gameService: GameService) {}

    @Auth()
    @Get("/")
    @ApiOkResponse({
        description: "Returns all games you are in.",
        type: [Game],
    })
    async getGames(@CurrentUser() user: User) {
        return await this.gameService.getGamesIn(user);
    }

    @Auth()
    @Get("/:id")
    @ApiOkResponse({
        description: "Returns the requested game, if you are in it.",
        type: Game,
    })
    @ApiNotFoundResponse({
        description: "Game with that ID not found.",
    })
    async getGameById(@CurrentUser() user: User, @Param("id") id: string) {
        return await this.gameService.getGameById(id, user);
    }

    @Auth()
    @Post("/")
    @ApiOkResponse({ description: "The game has been created", type: Game })
    async createNewGame(
        @Body() body: CreateGameDto,
        @CurrentUser() user: User
    ) {
        return await this.gameService.createGame(
            user,
            body.name,
            body.description
        );
    }
}
