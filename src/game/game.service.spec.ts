import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import Game from "./game.entity";
import InviteToken from "./invite-token.entity";
import GM from "./gm.entity";
import Player from "./player.entity";
import { GameService } from "./game.service";
import { LoggerService } from "logger/logger.service";

describe("GameService", () => {
    let service: GameService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GameService,
                LoggerService,
                {
                    provide: getRepositoryToken(Game),
                    useValue: {},
                },
                {
                    provide: getRepositoryToken(InviteToken),
                    useValue: {},
                },
                {
                    provide: getRepositoryToken(GM),
                    useValue: {},
                },
                {
                    provide: getRepositoryToken(Player),
                    useValue: {},
                },
            ],
        }).compile();

        service = module.get<GameService>(GameService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});
