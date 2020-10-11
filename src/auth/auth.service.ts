import { Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";

import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
    constructor(private userService: UserService) {}

    async validateUser(email: string, password: string) {
        const user = await this.userService.findUserByEmail(email);

        if (!user) {
            return null;
        }

        const passwordMatch = await bcrypt.compare(password, user.passwordHash);

        if (passwordMatch) {
            const { passwordHash, ...result } = user;
            return result;
        }

        return null;
    }
}
