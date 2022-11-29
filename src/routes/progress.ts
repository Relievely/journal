import {Router} from "express";
import {
    deleteProgressItemController,
    getAllProgressItemsController,
    getProgressItemController,
    insertProgressItemController, updateProgressItemDateController, updateProgressItemMoodController
} from "../middleware/controller/progressController";

export const progress = Router();

progress
    .get("/", getAllProgressItemsController)
    .post("/", insertProgressItemController)
    .get("/:id", getProgressItemController)
    .patch("/:id/mood", updateProgressItemMoodController)
    .patch("/:id/date", updateProgressItemDateController)
    .delete("/:id", deleteProgressItemController)
