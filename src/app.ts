import {routes} from "./routes";
import * as dotenv from "dotenv";

import express, {Express} from "express";

export const app: Express = express();

const config = dotenv.config({path: '.env'});

if (config.error) {
    throw config.error;
}

routes(app);