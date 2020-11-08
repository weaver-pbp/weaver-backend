import { Injectable } from "@nestjs/common";

@Injectable()
export class LoggerService {
    info(message: string) {
        console.log(`[info] ${message}`);
    }

    warning(message: string) {
        console.warn(`[warn] ${message}`);
    }

    error(message: string) {
        console.error(`[err] ${message}`);
    }

    async wrap<T>(message: string, promise: Promise<T>): Promise<T> {
        promise.catch((reason) => {
            console.error(`${message} failed with error: ${reason}.`);
        });

        return promise;
    }
}