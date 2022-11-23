import {Request, Response} from "express";
import {ResponseObject} from "../../interfaces";
import {
    createProgressItemAdapter,
    getAllProgressItemsAdapter,
    getProgressItemAdapter
} from "../adapters/database/progess";


export const getProgressItemController = (req: Request, res: Response<ResponseObject>): void => {
    getProgressItemAdapter(req)
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