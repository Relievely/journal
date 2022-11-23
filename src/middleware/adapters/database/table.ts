import {Request} from "express";
import {ResponseObject} from "../../../interfaces";
import Database, {Database as DatabaseType, RunResult} from "better-sqlite3";
import {databaseCreateErrorResponse} from "../../../helpers";

export const createTablesAdapter = async (req: Request): Promise<ResponseObject<RunResult[]>> => {
    return new Promise<ResponseObject<RunResult[]>>((resolve, reject) => {

        const db: DatabaseType = new Database('./progress.db');

        const endResult: RunResult[] = [];

        const createProgressTable = db.prepare(`CREATE TABLE IF NOT EXISTS progress
                                                (
                                                    id           INTEGER                                                                   NOT NULL
                                                        PRIMARY KEY AUTOINCREMENT,
                                                    creationDate INTEGER                                                                   NOT NULL,
                                                    mood         TEXT CHECK ( mood IN ('Very Bad', 'Bad', 'Medium', 'Good', 'Very Good') ) NOT NULL
                                                );`);

        const createNotesTable = db.prepare(`CREATE TABLE IF NOT EXISTS note
                                             (
                                                 id         INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                                                 content    TEXT    NOT NULL,
                                                 progressID INTEGER NOT NULL
                                             )
        `)

        try {
            db.transaction(() => {
                const cResult: RunResult = createProgressTable.run();
                if (cResult) {
                    endResult.push(cResult)
                } else {
                    db.close();
                    reject(databaseCreateErrorResponse(req));
                }
                const dResult: RunResult = createNotesTable.run();
                if (dResult) {
                    endResult.push(dResult);
                } else {
                    db.close();
                    reject(databaseCreateErrorResponse(req));
                }
            })();

            db.close();

            resolve({
                query: "/create",
                params: req.params,
                sender: "",
                body: {
                    length: endResult?.length ?? 0,
                    data: endResult
                }
            })
        } catch (err) {
            reject(err);
        }
    })
}