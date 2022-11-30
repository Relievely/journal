import {Router} from "express";
import {createTablesController} from "../middleware/controller/tableController";

export const creation = Router();

creation
    .all("/create", createTablesController)