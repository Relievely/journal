import cors from "cors";
import {Express} from "express";
import expressPinoLogger from "express-pino-logger";
import {progress} from "./routes/progress";
import {reflect} from "./routes/reflect";
import {note} from "./routes/note";
import {creation} from "./routes/creation";
import pino from "pino";
import bodyParser from "body-parser";
import multer, {Multer} from "multer";
import pretty from "pino-pretty";

const form: Multer = multer();

export const routes = (app: Express) => {
    app.use(cors({
        "origin": "*",
        "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
        "preflightContinue": false,
        "optionsSuccessStatus": 204
    }));

    const loggerMiddleware = expressPinoLogger({
        logger: pino(pretty({
            colorize: true
        }))
    });

    app.use(loggerMiddleware)
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())
    app.use(form.any())
    app.use(creation);
    app.use("/progress", progress);
    app.use("/note", note);
    app.use("/reflect", reflect);
}