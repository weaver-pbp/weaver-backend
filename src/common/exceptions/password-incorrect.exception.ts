import { HttpException, HttpStatus } from "@nestjs/common";
import { ErrorCode } from "./error-codes";

export class PasswordIncorrectException extends HttpException {
    constructor() {
        super(
            {
                message: "Password incorrect.",
                code: ErrorCode.PASSWORD_INCORRECT,
            },
            HttpStatus.BAD_REQUEST
        );
    }
}
