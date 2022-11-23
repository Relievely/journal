import {Router} from "express";
import {
    getAllProgressItemsController,
    getProgressItemController,
    insertProgressItemController
} from "../middleware/controller/progressController";

export const progress = Router();

progress
    .get("/", getAllProgressItemsController)
    .post("/", insertProgressItemController)
    .get("/:id", getProgressItemController)
