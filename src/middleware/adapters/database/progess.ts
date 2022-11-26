import {Request} from "express";
import {ProgressItem, ResponseObject} from "../../../interfaces";
import Database, {Database as DatabaseType, RunResult, Statement} from "better-sqlite3";
import {
    emptyResultResponse,
    emptyStatementResponse,
    responseObjectItem,
    responseObjectItems
} from "../../../helpers";

export const getProgressItemAdapter = async (req: Request): Promise<ResponseObject<ProgressItem>> => {
    return new Promise<ResponseObject<ProgressItem>>((resolve, reject) => {

        const db: DatabaseType = new Database('./progress.db');

        const stmt: Statement = db.prepare(`SELECT * FROM progress WHERE id = ?`);

        if(!stmt) {
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
