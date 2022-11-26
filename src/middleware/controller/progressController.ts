import {Request, Response} from "express";
import {ProgressItem, ResponseObject} from "../../interfaces";
import {
    createProgressItemAdapter,
    getAllProgressItemsAdapter,
    getProgressItemAdapter
} from "../adapters/database/progess";
import {RunResult} from "better-sqlite3";
import {responseError} from "../../helpers";

export const getProgressItemController = (req: Request, res: Response<ResponseObject<ProgressItem>>): void => {
    getProgressItemAdapter(req)
        .then((response: ResponseObject<ProgressItem>) => {
            res.status(200).json(response);
        })
        .catch((err: Error) => {
            res.status(500).json(responseError(req, err.message));
        })
}

export const getAllProgressItemsController = (req: Request, res: Response<ResponseObject<ProgressItem[]>>): void => {
    getAllProgressItemsAdapter(req)
        .then((response: ResponseObject<ProgressItem[]>) => {
            res.status(200).json(response);
        })
        .catch((err: Error) => {
            res.status(500).json(responseError(req, err.message));
        })
}

export const insertProgressItemController = (req: Request, res: Response<ResponseObject<RunResult>>): void => {
    createProgressItemAdapter(req)
        .then((response: ResponseObject<RunResult>) => {
            res.status(200).json(response);
        })
        .catch((err: Error) => {
            res.status(500).json(responseError(req, err.message));
        })
}