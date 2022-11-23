import {Request, Response} from "express";
import {ResponseObject} from "../../interfaces";
import {createTablesAdapter} from "../adapters/database";

export const createTablesController = (req: Request, res: Response<ResponseObject>): void => {
    createTablesAdapter(req)
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
