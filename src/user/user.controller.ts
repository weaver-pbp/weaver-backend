import { Body, Controller, Get, Post, Put, Request } from "@nestjs/common";
import { UserService } from "./user.service";
import User from "./user.entity";
import { Auth } from "common/decorators/auth.decorator";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { UpdateUserDto } from "./dto/update-user.dto";
import { CurrentUser } from "common/decorators/current-user.decorator";

@ApiTags("user")
@Controller("user")
export class UserController {
    constructor(private userService: UserService) {}

    @Auth()
    @Get("me")
    @ApiOkResponse({ description: "Returns the current user.", type: User })
    async getCurrentUser(@Request() req): Promise<User> {
        return await this.userService.findUserById(req.user.id);
    }

    @Auth()
    @Put("me")
    @ApiOkResponse({ description: "The user has been updated", type: User })
    async updateCurrentUser(
        @Body() body: UpdateUserDto,
        @CurrentUser() user: User
    ): Promise<User> {
        return await this.userService.updateUser({ id: user.id, ...body });
    }
}
