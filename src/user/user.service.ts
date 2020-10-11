import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import User from "./user.entity";

import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    async getCurrentUser() {
        const user = await this.userRepository.findOne({
            where: { email: "woochy@test.com" },
        });

        return user;
    }

    async findUserById(uid: string) {
        const user = await this.userRepository.findOne({
            where: { uid },
        });

        return user;
    }

    async findUserByEmail(email: string) {
        const user = await this.userRepository.findOne({
            where: { email },
            select: ["uid", "username", "tag", "email", "passwordHash"],
        });

        return user;
    }

    async createNewUser(email: string, password: string, username: string) {
        const passwordHash = await bcrypt.hash(password, 10);

        const user = this.userRepository.create({
            email,
            passwordHash,
            username,
        });

        const { passwordHash: _, ...result } = await this.userRepository.save(
            user
        );

        return result as User;
    }
}
