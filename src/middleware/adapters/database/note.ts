import {Request} from "express";
import {NoteItem, ResponseObject} from "../../../interfaces";
import {RunResult, Statement} from "better-sqlite3";
import {
    emptyResultResponse,
    emptyStatementResponse, emptyItemResponse,
    responseObjectItem,
    responseObjectItems, serviceDB
} from "../../../helpers";

export const getAllNoteItemsAdapter = async (req: Request): Promise<ResponseObject<NoteItem[]>> => {
    return new Promise<ResponseObject<NoteItem[]>>((resolve, reject): void => {
        const stmt: Statement = serviceDB.prepare(`SELECT * FROM note`);

        try {
            const results: NoteItem[] = stmt.all() as NoteItem[];
            resolve(responseObjectItems<NoteItem>(req, results));
        } catch (err) {
            reject(err);
        }
    });
}

export const getNoteItemAdapter = async (req: Request): Promise<ResponseObject<NoteItem>> => {
    return new Promise<ResponseObject<NoteItem>>((resolve, reject): void => {
        const stmt: Statement<number> = serviceDB.prepare<number>(`SELECT * FROM note WHERE id = ?`);

        if (!stmt) {
            reject(emptyStatementResponse)
        }
        const result: NoteItem = stmt.get(Number(req.params.id)) as NoteItem;
        if (result) {
            resolve(responseObjectItem<NoteItem>(req, result));
        } else {
            reject(emptyResultResponse)
        }
    });
}

export const createNoteItemAdapter = async (req: Request): Promise<ResponseObject<RunResult>> => {
    return new Promise<ResponseObject<RunResult>>((resolve, reject) => {
        const stmt = serviceDB.prepare<[string, number]>(`INSERT INTO note (content, progressID) VALUES (?, ?)`);
        if (!stmt) {
            reject(emptyStatementResponse);
        }

        const item: NoteItem = req.body as NoteItem;
        if (!item) {
            reject(emptyItemResponse);
        }
        const result: RunResult = stmt.run(item.content, Number(item.progressID));
        if (result) {
            resolve(responseObjectItem<RunResult>(req, result))
        } else {
            reject(emptyResultResponse)
        }
    });
}

export const updateNoteItemAdapter = async (req: Request): Promise<ResponseObject<RunResult>> => {
    return new Promise<ResponseObject<RunResult>>((resolve, reject) => {
        const stmt = serviceDB.prepare<[string, number]>(`UPDATE note SET content = ? WHERE id = ?`);
        if (!stmt) {
            reject(emptyStatementResponse);
        }

        const item: NoteItem = req.body as NoteItem;
        if (!item) {
            reject(emptyItemResponse);
        }
        const result: RunResult = stmt.run(item.content, item.id);
        if (result) {
            resolve(responseObjectItem<RunResult>(req, result))
        } else {
            reject(emptyResultResponse)
        }
    });
}

export const deleteNoteItemAdapter = async (req: Request): Promise<ResponseObject<RunResult>> => {
    return new Promise<ResponseObject<RunResult>>((resolve, reject) => {
        const stmt = serviceDB.prepare<string>(`DELETE FROM note WHERE id = ?`);
        if (!stmt) {
            reject(emptyStatementResponse);
        }
        const result: RunResult = stmt.run(req.params.id);
        if (result) {
            resolve(responseObjectItem<RunResult>(req, result))
        } else {
            reject(emptyResultResponse)
        }
    });
}