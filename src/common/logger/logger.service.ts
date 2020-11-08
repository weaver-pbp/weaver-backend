import { Injectable } from "@nestjs/common";

@Injectable()
export class LoggerService {
    info(message: string) {
        console.log(`[weaver] [info] ${message}`);
    }

    warning(message: string) {
        console.warn(`[weaver] [warn] ${message}`);
    }

    error(message: string) {
        console.error(`[weaver] [err] ${message}`);
    }

    async wrap<T>(message: string, promise: Promise<T>): Promise<T> {
        promise.catch(reason => {
            this.error(`"${message}" failed with error: ${reason}`);
        });

        return promise;
    }
}
