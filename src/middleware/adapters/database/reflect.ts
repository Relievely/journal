import {Request} from "express";
import {ProgressItem, ResponseObject} from "../../../interfaces";
import Database, {Database as DatabaseType, Statement} from "better-sqlite3";
import {
    emptyResultResponse,
    emptyStatementResponse,
    responseObjectItem
} from "../../../helpers";

export const getLatestMoodAdapter = async (req: Request): Promise<ResponseObject<ProgressItem>> => {
    return new Promise<ResponseObject<ProgressItem>>((resolve, reject) => {

        const db: DatabaseType = new Database('./progress.db');

        const stmt: Statement = db.prepare(`SELECT * FROM progress WHERE creationDate = (SELECT max(creationDate) FROM progress) LIMIT 1`);

        if (!stmt) {
            reject(emptyStatementResponse)
        }
        try {
            const result: ProgressItem = stmt.get() as ProgressItem;
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