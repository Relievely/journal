import {routes} from "./routes";
import * as dotenv from "dotenv";

import express, {Express} from "express";
import fs from "fs";

export const app: Express = express();

if (fs.existsSync('.env')) {
    const config = dotenv.config({path: '.env'});

    if (config.error) {
        throw config.error;
    }
} else {
    console.log("No environment file provided");
}

routes(app);