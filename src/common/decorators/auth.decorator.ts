import { applyDecorators, UseGuards } from "@nestjs/common";
import { ApiUnauthorizedResponse } from "@nestjs/swagger";
import { AuthenticatedGuard } from "common/guards/authenticated.guard";

export function Auth() {
    return applyDecorators(
        UseGuards(AuthenticatedGuard),
        ApiUnauthorizedResponse({ description: "Unauthorized" })
    );
}
