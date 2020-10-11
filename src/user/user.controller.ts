import { Controller, Get, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import User from "./user.entity";

@Controller("user")
export class UserController {
    constructor(private userService: UserService) {}

    @Get("me")
    async getCurrentUser(): Promise<User> {
        return await this.userService.getCurrentUser();
    }

    @Post()
    async createNew(): Promise<User> {
        return await this.userService.createNewUser();
    }
}
