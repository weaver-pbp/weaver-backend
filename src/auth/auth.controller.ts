import { Controller, Post, UseGuards, Request, Body } from "@nestjs/common";
import { ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { Auth } from "common/decorators/auth.decorator";
import { LoginGuard } from "common/guards/login.guard";
import User from "user/user.entity";
import { UserService } from "user/user.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
    constructor(private userService: UserService) {}

    @UseGuards(LoginGuard)
    @Post("login")
    @ApiResponse({ status: 200, description: "Login was successful." })
    @ApiUnauthorizedResponse()
    async login(@Request() req, @Body() body: LoginDto): Promise<User> {
        return req.user;
    }

    @Post("register")
    @ApiResponse({ status: 200, description: "Registration was successful." })
    async register(@Body() body: RegisterDto): Promise<User> {
        return await this.userService.createNewUser(
            body.email,
            body.password,
            body.username
        );
    }

    @Auth()
    @Post("logout")
    @ApiResponse({ status: 200, description: "Logout was successful." })
    async logout(@Request() req) {
        return req.logout();
    }
}