import cors from "cors";
import {Express} from "express";
import {progress} from "./routes/progress";
import {reflect} from "./routes/reflect";
import {note} from "./routes/note";
import {creation} from "./routes/creation";
import pino_http from "pino-http";
import bodyParser from "body-parser";
import multer, {Multer} from "multer";

const form: Multer = multer();

export const routes = (app: Express) => {
    app.use(cors({
        "origin": "*",
        "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
        "preflightContinue": false,
        "optionsSuccessStatus": 204
    }));

    app.use(pino_http());
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())
    app.use(form.any())
    app.use(creation);
    app.use("/progress", progress);
    app.use("/note", note);
    app.use("/reflect", reflect);
}