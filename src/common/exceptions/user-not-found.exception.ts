import { HttpException, HttpStatus } from "@nestjs/common";
import { ErrorCode } from "./error-codes";

export class UserNotFoundException extends HttpException {
    constructor() {
        super(
            {
                message: "User not found.",
                code: ErrorCode.USER_NOT_FOUND,
            },
            HttpStatus.BAD_REQUEST
        );
    }
}
