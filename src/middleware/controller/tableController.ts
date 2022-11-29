import {Request, Response} from "express";
import {ResponseObject} from "../../interfaces";
import {RunResult} from "better-sqlite3";
import {createTablesAdapter} from "../adapters/database/table";
import {responseError} from "../../helpers";

export const createTablesController = (req: Request, res: Response<ResponseObject<RunResult[]>>): void => {
    createTablesAdapter(req)
        .then((response: ResponseObject<RunResult[]>) => {
            res.status(200).json(response);
        })
        .catch((err: Error) => {
            res.status(500).json(responseError(req, err.message));
        })
}
