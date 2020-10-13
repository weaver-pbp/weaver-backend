import { Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";

import * as bcrypt from "bcrypt";
import { UserNotFoundException } from "common/exceptions/user-not-found.exception";
import { PasswordIncorrectException } from "common/exceptions/password-incorrect.exception";

@Injectable()
export class AuthService {
    constructor(private userService: UserService) {}

    async validateUser(email: string, password: string) {
        const user = await this.userService.findUserByEmail(email);

        if (!user) {
            throw new UserNotFoundException();
        }

        const passwordMatch = await bcrypt.compare(password, user.passwordHash);

        if (passwordMatch) {
            const { passwordHash, ...result } = user;
            return result;
        } else {
            throw new PasswordIncorrectException();
        }
    }
}
