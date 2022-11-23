import {Router} from "express";
import {getAllProgressItemsController, insertProgressItemController} from "../middleware/controller/progressController";

export const progress = Router();

progress
    .get("/", getAllProgressItemsController)
    .post("/", insertProgressItemController)