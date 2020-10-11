import { Controller, Get, Request } from "@nestjs/common";
import { UserService } from "./user.service";
import User from "./user.entity";
import { Auth } from "common/decorators/auth.decorator";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("user")
@Controller("user")
export class UserController {
    constructor(private userService: UserService) {}

    @Auth()
    @Get("me")
    @ApiOkResponse({ description: "Returns the current user.", type: User })
    async getCurrentUser(@Request() req): Promise<User> {
        return await this.userService.findUserById(req.user.uid);
    }
}
