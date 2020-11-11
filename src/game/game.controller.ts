import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiOkResponse } from "@nestjs/swagger";
import { Auth } from "common/decorators/auth.decorator";
import { CurrentUser } from "common/decorators/current-user.decorator";
import User from "user/user.entity";
import { CreateGameDto } from "./dto/create-game.dto";
import Game from "./game.entity";
import { GameService } from "./game.service";

@Controller("game")
export class GameController {
    constructor(private gameService: GameService) {}

    @Auth()
    @Get("/owned")
    @ApiOkResponse({
        description: "Returns all games you are the owner of.",
        type: [Game],
    })
    async getOwnedGames(@CurrentUser() user: User) {
        return await this.gameService.getGamesOwnedBy(user);
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
