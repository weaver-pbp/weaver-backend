import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import Game from "./game.entity";
import { GameService } from "./game.service";

describe("GameService", () => {
    let service: GameService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GameService,
                {
                    provide: getRepositoryToken(Game),
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
