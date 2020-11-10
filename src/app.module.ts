import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { GameModule } from "game/game.module";

@Module({
    imports: [TypeOrmModule.forRoot(), UserModule, AuthModule, GameModule],
})
export class AppModule {}
