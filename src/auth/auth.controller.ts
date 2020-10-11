import { Controller, Post, UseGuards, Request, Body } from "@nestjs/common";
import { LoginGuard } from "common/guards/login.guard";
import { UserService } from "user/user.service";

@Controller("auth")
export class AuthController {
    constructor(private userService: UserService) {}

    @UseGuards(LoginGuard)
    @Post("login")
    async login(@Request() req) {
        return req.user;
    }

    @Post("register")
    async register(@Body() body) {
        return await this.userService.createNewUser(
            body.email,
            body.password,
            body.username
        );
    }

    @Post("logout")
    async logout(@Request() req) {
        return req.logout();
    }
}
