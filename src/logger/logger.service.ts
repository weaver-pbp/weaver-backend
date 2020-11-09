import { Injectable, Logger, Scope } from "@nestjs/common";

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService extends Logger {
    log(message: string) {
        console.log(`[weaver] [info] ${message}`);
    }

    warn(message: string) {
        console.warn(`[weaver] [warn] ${message}`);
    }

    error(message: string, trace?: string) {
        if (!trace) {
            console.error(`[weaver] [err] ${message}`);
        } else {
            console.error(`[weaver] [err] ${message}`, trace);
        }
    }

    async wrap<T>(message: string, promise: Promise<T>): Promise<T> {
        promise.catch((err: Error) => {
            this.error(
                `"${message}" failed with error: ${err.message}`,
                err.stack
            );
        });

        return promise;
    }
}
