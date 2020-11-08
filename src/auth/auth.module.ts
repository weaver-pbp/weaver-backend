import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { LocalStrategy } from "./local.strategy";
import { SessionSerializer } from "./session.serializer";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "user/user.module";
import { LoggerModule } from "common/logger/logger.module";

@Module({
    imports: [UserModule, PassportModule, LoggerModule],
    providers: [AuthService, LocalStrategy, SessionSerializer],
    controllers: [AuthController],
})
export class AuthModule {}
