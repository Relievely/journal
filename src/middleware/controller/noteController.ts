import {Request, Response} from "express";
import {ResponseObject} from "../../interfaces";
import {getAllNoteItemsAdapter} from "../adapters/database";

export const getAllNoteItemsController = (req: Request, res: Response<ResponseObject>): void => {
    getAllNoteItemsAdapter(req)
        .then((response: ResponseObject) => {
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
