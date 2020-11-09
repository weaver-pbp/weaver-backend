import { Test, TestingModule } from "@nestjs/testing";
import { LoggerService } from "./logger.service";

describe("logger service", () => {
    let service: LoggerService;

    beforeEach(async () => {
        console.log = jest.fn();
        console.warn = jest.fn();
        console.error = jest.fn();

        const module: TestingModule = await Test.createTestingModule({
            providers: [LoggerService],
        }).compile();

        service = await module.resolve<LoggerService>(LoggerService);
    });

    it("should output info message", () => {
        // arrange
        const message = "mock message";
        const expectedLog = "[weaver] [info] mock message";

        // act
        service.log(message);

        // assert
        expect(console.log).toHaveBeenCalledTimes(1);
        expect(console.log).toHaveBeenCalledWith(expectedLog);
    });

    it("should output warning message", () => {
        // arrange
        const message = "mock message";
        const expectedLog = "[weaver] [warn] mock message";

        // act
        service.warn(message);

        // assert
        expect(console.warn).toHaveBeenCalledTimes(1);
        expect(console.warn).toHaveBeenCalledWith(expectedLog);
    });

    it("should output error message", () => {
        // arrange
        const message = "mock message";
        const expectedLog = "[weaver] [err] mock message";

        // act
        service.error(message);

        // assert
        expect(console.error).toHaveBeenCalledTimes(1);
        expect(console.error).toHaveBeenCalledWith(expectedLog);
    });

    it("should wrap a failed promise", async () => {
        // arrange
        const promise = new Promise((resolve, reject) => {
            reject(new Error("mock error"));
        });
        const message = "mock message";
        const expectedLog =
            '[weaver] [err] "mock message" failed with error: mock error';

        // act
        try {
            await service.wrap(message, promise);
        } catch (e) {}

        // assert
        expect(console.error).toHaveBeenCalledTimes(1);
    });
});
