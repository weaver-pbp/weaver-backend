import "dotenv";

import { NestFactory } from "@nestjs/core";
import * as session from "express-session";
import * as passport from "passport";
import { SESSION_SECRET } from "utils/secrets";
import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.use(
        session({
            secret: SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
        })
    );

    app.use(passport.initialize());
    app.use(passport.session());

    await app.listen(3000);
}
bootstrap();
