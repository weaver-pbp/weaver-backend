import {
    Controller,
    Post,
    UseGuards,
    Request,
    Body,
    Get,
    HttpCode,
    HttpException,
    HttpStatus,
} from "@nestjs/common";
import { ApiResponse, ApiTags, ApiBadRequestResponse } from "@nestjs/swagger";
import { Auth } from "common/decorators/auth.decorator";
import { LoginGuard } from "common/guards/login.guard";
import { LoggerService } from "logger/logger.service";
import User from "user/user.entity";
import { UserService } from "user/user.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
    constructor(
        private userService: UserService,
        private loggerService: LoggerService
    ) {
        loggerService.setContext("Auth Controller");
    }

    @UseGuards(LoginGuard)
    @Post("login")
    @HttpCode(200)
    @ApiResponse({ status: 200, description: "Login was successful." })
    @ApiBadRequestResponse()
    async login(@Request() req, @Body() body: LoginDto): Promise<User> {
        return req.user;
    }

    @Post("register")
    @ApiResponse({ status: 200, description: "Registration was successful." })
    async register(@Request() req, @Body() body: RegisterDto): Promise<User> {
        const result = await this.loggerService.wrap(
            "Create new user",
            this.userService.createNewUser(
                body.email,
                body.password,
                body.username
            )
        );

        req.logIn(result, error => {
            throw new HttpException(
                { message: "Created user but couldn't log in." },
                HttpStatus.CREATED
            );
        });

        return result;
    }

    @Auth()
    @Post("logout")
    @ApiResponse({ status: 200, description: "Logout was successful." })
    async logout(@Request() req) {
        return req.logout();
    }

    @Get("check")
    @ApiResponse({
        status: 200,
        description: "Returns whether the request was authenticated or not",
    })
    async check(@Request() req) {
        return req.isAuthenticated();
    }
}
