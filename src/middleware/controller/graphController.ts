import {ResponseObject} from "../../interfaces";
import {responseError} from "../../helpers";
import {Request, Response} from "express";
import {getFeelingData} from "../adapters/database/graph";

export const getFeelings = (req: Request, res: Response<ResponseObject<any>>) => {
    getFeelingData(req)
        .then((response: ResponseObject<any>) => {
            res.status(200).json(response);
        })
        .catch((err: Error) => {
            res.status(500).json(responseError(req, err.message));
        })

};