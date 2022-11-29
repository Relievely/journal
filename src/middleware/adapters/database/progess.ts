import {Request} from "express";
import {ProgressItem, ResponseObject} from "../../../interfaces";
import Database, {Database as DatabaseType, RunResult, Statement} from "better-sqlite3";
import {
    emptyItemResponse,
    emptyResultResponse,
    emptyStatementResponse,
    responseObjectItem,
    responseObjectItems, serviceDB
} from "../../../helpers";

export const getProgressItemAdapter = async (req: Request): Promise<ResponseObject<ProgressItem>> => {
    return new Promise<ResponseObject<ProgressItem>>((resolve, reject) => {

        const db: DatabaseType = new Database('./progress.db');

        const stmt: Statement = db.prepare(`SELECT * FROM progress WHERE id = ?`);

        if (!stmt) {
            reject(emptyStatementResponse)
        }
        try {
            const result: ProgressItem = stmt.get(req.params.id) as ProgressItem;
            if (result) {
                resolve(responseObjectItem<ProgressItem>(req, result));
            } else {
                reject(emptyResultResponse)
            }
        } catch (err) {
            reject(err);
        }
    });
}

export const getAllProgressItemsAdapter = async (req: Request): Promise<ResponseObject<ProgressItem[]>> => {
    return new Promise<ResponseObject<ProgressItem[]>>((resolve, reject) => {

        const db: DatabaseType = new Database('./progress.db');

        const stmt: Statement = db.prepare(`SELECT * FROM progress`);

        try {
            const results: ProgressItem[] = stmt.all() as ProgressItem[];
            if (results) {
                resolve(responseObjectItems<ProgressItem>(req, results))
            } else {
                reject(emptyResultResponse)
            }
        } catch (err) {
            reject(err);
        }
    });
}

export const createProgressItemAdapter = async (req: Request): Promise<ResponseObject<RunResult>> => {
    return new Promise<ResponseObject<RunResult>>((resolve, reject) => {

        const db: DatabaseType = new Database('./progress.db');

        const stmt = db.prepare(`INSERT INTO progress (creationDate, mood)
                                 VALUES (1, 'Good'),
                                        (2, 'Very Bad')`);

        try {
            const result: RunResult = stmt.run();
            resolve(responseObjectItem<RunResult>(req, result))
        } catch (err) {
            reject(err);
        }
    });
}

export const updateProgressItemCreationAdapter = async (req: Request): Promise<ResponseObject<RunResult>> => {
    return new Promise<ResponseObject<RunResult>>((resolve, reject) => {
        const stmt = serviceDB.prepare<[number, number]>(`UPDATE progress SET creationDate = ? WHERE id = ?`);
        if (!stmt) {
            reject(emptyStatementResponse);
        }

        const item: ProgressItem = req.body as ProgressItem;
        if (!item) {
            reject(emptyItemResponse);
        }
        const result: RunResult = stmt.run(Number(item.creationDate), item.id);
        if (result) {
            resolve(responseObjectItem<RunResult>(req, result))
        } else {
            reject(emptyResultResponse)
        }
    });
}

export const updateProgressItemMoodAdapter = async (req: Request): Promise<ResponseObject<RunResult>> => {
    return new Promise<ResponseObject<RunResult>>((resolve, reject) => {
        const stmt = serviceDB.prepare<[string, number]>(`UPDATE progress SET mood = ? WHERE id = ?`);
        if (!stmt) {
            reject(emptyStatementResponse);
        }

        const item: ProgressItem = req.body as ProgressItem;
        if (!item) {
            reject(emptyItemResponse);
        }
        const result: RunResult = stmt.run(item.mood, item.id);
        if (result) {
            resolve(responseObjectItem<RunResult>(req, result))
        } else {
            reject(emptyResultResponse)
        }
    });
}

export const deleteProgressItemAdapter = async (req: Request): Promise<ResponseObject<RunResult>> => {
    return new Promise<ResponseObject<RunResult>>((resolve, reject) => {
        const stmt = serviceDB.prepare<string>(`DELETE FROM progress WHERE id = ?`);
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
