import {Request, Response} from "express";
import {ProgressItem, ResponseObject} from "../../interfaces";
import {getLatestMoodAdapter} from "../adapters/database/reflect";
import {responseError} from "../../helpers";


export const getItemsController = (req: Request, res: Response<ResponseObject<ProgressItem>>): void => {
    getLatestMoodAdapter(req)
        .then((response: ResponseObject<ProgressItem>) => {
            res.status(200).json(response);
        })
        .catch((err: Error) => {
            res.status(500).json(responseError(req, err.message));
        })
}