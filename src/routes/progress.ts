import {Router} from "express";
import {
    getAllProgressItemsController,
    getProgressItemController,
    insertProgressItemController
} from "../middleware/controller/progressController";

export const progress = Router();

progress
    .get("/", getAllProgressItemsController)
    .get("/:id", getProgressItemController)
    .post("/", insertProgressItemController)