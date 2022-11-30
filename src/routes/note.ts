import {Router} from "express";
import {
    createNoteItemController, deleteNoteItemController,
    getAllNoteItemsController,
    getNoteItemController, updateNoteItemController
} from "../middleware/controller/noteController";

export const note = Router();

note
    .get("/", getAllNoteItemsController)
    .post("/", createNoteItemController)
    .patch("/:id", updateNoteItemController)
    .get("/:id", getNoteItemController)
    .delete("/:id", deleteNoteItemController)

