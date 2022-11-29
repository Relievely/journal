import cors from "cors";
import {Express} from "express";
import {logger} from "./middleware/logger";
import {progress} from "./routes/progress";
import {note} from "./routes/note";
import {creation} from "./routes/creation";
import pino_http from "pino-http";
import bodyParser from "body-parser";
import multer, {Multer} from "multer";

const form: Multer = multer();

export const routes = (app: Express) => {
    app.get("/", (req, res) => res.send('Hello World'));
    app.get("/graph",getFeelings)
}