import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import User from "./user.entity";
import { AuthenticatedGuard } from "common/guards/authenticated.guard";

@Controller("user")
export class UserController {
    constructor(private userService: UserService) {}

    @UseGuards(AuthenticatedGuard)
    @Get("me")
    async getCurrentUser(@Request() req): Promise<User> {
        return await this.userService.findUserById(req.user.uid);
    }
}
