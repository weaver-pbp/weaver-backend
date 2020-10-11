import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { LocalStrategy } from "./local.strategy";
import { SessionSerializer } from "./session.serializer";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "user/user.module";

@Module({
    imports: [UserModule, PassportModule],
    providers: [AuthService, LocalStrategy, SessionSerializer],
    controllers: [AuthController],
})
export class AuthModule {}
