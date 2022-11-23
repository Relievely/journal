import {Request, Response} from "express";
import {ResponseObject} from "../../interfaces";
import {createProgressItemAdapter, getAllProgressItemsAdapter} from "../adapters/database";

export const getAllProgressItemsController = (req: Request, res: Response<ResponseObject>): void => {
    getAllProgressItemsAdapter(req)
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

export const insertProgressItemController = (req: Request, res: Response<ResponseObject>): void => {
    createProgressItemAdapter(req)
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