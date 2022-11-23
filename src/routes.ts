import cors from "cors";
import {Express} from "express";
import {logger} from "./middleware/logger";
import {progress} from "./routes/progress";
import {note} from "./routes/note";
import {creation} from "./routes/creation";

export const routes = (app: Express) => {
    app.use(cors)
    app.use(creation);
    app.use("/progress", progress);
    app.use("/note", note);
    app.get("/", (req, res) => res.send('Hello World'));
    app.get("/good", logger, (req, res) => res.status(200).json({success: 'Well done this route is working perfectly'}))
    app.get("/bad", (req, res) => res.status(500).json({error: 'Too bad this route does mean something does not work correctly'}))
}