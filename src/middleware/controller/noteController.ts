import {Request, Response} from "express";
import {NoteItem, ResponseObject} from "../../interfaces";
import {
    createNoteItemAdapter, deleteNoteItemAdapter,
    getAllNoteItemsAdapter,
    getNoteItemAdapter,
    updateNoteItemAdapter
} from "../adapters/database/note";
import {responseError} from "../../helpers";

import pino from "pino";
import {RunResult} from "better-sqlite3";

const logger = pino()

export const getAllNoteItemsController = (req: Request, res: Response<ResponseObject<NoteItem[]>>): void => {
    getAllNoteItemsAdapter(req)
        .then((response: ResponseObject<NoteItem[]>) => {
            res.status(200).json(response);
        })
        .catch((err: Error) => {
            res.status(500).json(responseError(req, err.message));
        })
}

export const getNoteItemController = (req: Request, res: Response<ResponseObject<NoteItem>>): void => {
    getNoteItemAdapter(req)
        .then((response: ResponseObject<NoteItem>) => {
            res.status(200).json(response);
        })
        .catch((err: Error) => {
            logger.error(`Error while getting note: ${err.message}`);
            res.status(500).json(responseError(req, err.message));
        })
}

export const createNoteItemController = (req: Request, res: Response<ResponseObject<RunResult>>): void => {
    createNoteItemAdapter(req)
        .then((response: ResponseObject<RunResult>) => res.status(200).json(response))
        .catch((err: Error) => res.status(500).json(responseError(req, err.message)))
}

export const updateNoteItemController = (req: Request, res: Response<ResponseObject<RunResult>>): void => {
    updateNoteItemAdapter(req)
        .then((response: ResponseObject<RunResult>) => res.status(200).json(response))
        .catch((err: Error) => res.status(500).json(responseError(req, err.message)))
}

export const deleteNoteItemController = (req: Request, res: Response<ResponseObject<RunResult>>): void => {
    deleteNoteItemAdapter(req)
        .then((response: ResponseObject<RunResult>) => res.status(200).json(response))
        .catch((err: Error) => res.status(500).json(responseError(req, err.message)))
}
