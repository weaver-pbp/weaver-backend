import * as dotenv from "dotenv";
import * as fs from "fs";

if (fs.existsSync(".env.local")) {
    dotenv.config({ path: ".env.local" });
}

export const { SESSION_SECRET } = process.env;
