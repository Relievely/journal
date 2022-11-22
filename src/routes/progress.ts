import {Router} from "express";
import {getAllProgressItemsController} from "../middleware/controller/progressController";

export const progress = Router();

progress
    .get("/", getAllProgressItemsController)