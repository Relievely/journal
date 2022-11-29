import {Request, Response} from "express";
import {ProgressItem, ResponseObject} from "../../interfaces";
import {
    createProgressItemAdapter, deleteProgressItemAdapter,
    getAllProgressItemsAdapter,
    getGraphProgressItemsAdapter,
    getProgressItemAdapter, updateProgressItemCreationAdapter, updateProgressItemMoodAdapter
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

export const getGraphProgressItemsController = (req: Request, res: Response<ResponseObject<ProgressItem[]>>): void => {
    getGraphProgressItemsAdapter(req)
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

export const updateProgressItemMoodController = (req: Request, res: Response<ResponseObject<RunResult>>): void => {
    updateProgressItemMoodAdapter(req)
        .then((response: ResponseObject<RunResult>) => res.status(200).json(response))
        .catch((err: Error) => res.status(500).json(responseError(req, err.message)))
}

export const updateProgressItemDateController = (req: Request, res: Response<ResponseObject<RunResult>>): void => {
    updateProgressItemCreationAdapter(req)
        .then((response: ResponseObject<RunResult>) => res.status(200).json(response))
        .catch((err: Error) => res.status(500).json(responseError(req, err.message)))
}

export const deleteProgressItemController = (req: Request, res: Response<ResponseObject<RunResult>>): void => {
    deleteProgressItemAdapter(req)
        .then((response: ResponseObject<RunResult>) => res.status(200).json(response))
        .catch((err: Error) => res.status(500).json(responseError(req, err.message)))
}