import {Request, Response} from "express";
import {NoteItem, ResponseObject} from "../../interfaces";
import {getAllNoteItemsAdapter} from "../adapters/database/note";

export const getAllNoteItemsController = (req: Request, res: Response<ResponseObject<NoteItem[]>>): void => {
    getAllNoteItemsAdapter(req)
        .then((response: ResponseObject<NoteItem[]>) => {
            res.status(200).json(response);
        })
        .catch((err: Error) => {
            res.status(500).json({
                query: req.query,
                params: [],
                sender: "",
                error: err
            });
        })
}
