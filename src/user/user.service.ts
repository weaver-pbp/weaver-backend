import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import User from "./user.entity";

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

    async createNewUser() {
        const user = this.userRepository.create({
            username: "woochy",
            tag: 6445,
            email: "woochy@test.com",
        });

        return await this.userRepository.save(user);
    }
}
