import "dotenv";

import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import * as session from "express-session";
import * as passport from "passport";
import { SESSION_SECRET } from "utils/secrets";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { LoggerService } from "logger/logger.service";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        cors: {
            origin: /.*/,
            credentials: true,
        },
    });

    app.useLogger(new LoggerService());

    app.use(
        session({
            secret: SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
        })
    );

    app.use(passport.initialize());
    app.use(passport.session());

    const options = new DocumentBuilder()
        .setTitle("Weaver API")
        .setDescription("The API documentation for the Weaver RPG project.")
        .setVersion(process.env.npm_package_version)
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup("api", app, document);

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
        })
    );

    await app.listen(process.env.PORT);
}
bootstrap();
