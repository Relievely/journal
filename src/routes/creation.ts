import {Router} from "express";
import {createTablesController} from "../middleware/controller/tableController";
import {logger} from "../middleware/logger";

export const creation = Router();

creation
    .all("/create", createTablesController)