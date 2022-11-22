import {Router} from "express";
import {getAllNoteItemsController} from "../middleware/controller/noteController";

export const note = Router();

note
    .get("/", getAllNoteItemsController)