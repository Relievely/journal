import {Request} from "express";
import {ResponseObject} from "../../../interfaces";
import Database, {Database as DatabaseType, RunResult} from "better-sqlite3";

export const getAllNoteItemsAdapter = async (req: Request): Promise<ResponseObject<RunResult[]>> => {
    return new Promise<ResponseObject<RunResult[]>>((resolve, reject) => {

        const db: DatabaseType = new Database('./progress.db');

        const stmt = db.prepare(`SELECT *
                                 FROM note`);

        try {
            const results: RunResult[] = stmt.all();
            resolve({
                query: "/notes/all",
                params: req.params,
                sender: "",
                body: {
                    length: results?.length ?? 0,
                    data: results
                }
            })
        } catch (err) {
            reject(err);
        }
    });
}