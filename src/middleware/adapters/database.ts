import {ResponseObject} from "../../interfaces";
import {Request} from "express";
import Database, {Database as DatabaseType, RunResult, Statement} from 'better-sqlite3';
import {databaseCreateErrorResponse} from "../../helpers";

export const createTablesAdapter = async (req: Request): Promise<ResponseObject> => {
    return new Promise<ResponseObject>((resolve, reject) => {

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
                const cResult = createProgressTable.run();
                if (cResult) {
                    endResult.push(cResult)
                } else {
                    db.close();
                    reject(databaseCreateErrorResponse(req));
                }
                const dResult = createNotesTable.run();
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

export const getAllProgressItemsAdapter = async (req: Request): Promise<ResponseObject> => {
    return new Promise<ResponseObject>((resolve, reject) => {

        const db: DatabaseType = new Database('./progress.db');

        const stmt: Statement = db.prepare(`SELECT * FROM progress`);

        try {
            const results: RunResult[] = stmt.all();
            if (results) {
                resolve({
                    query: "/progress/all",
                    params: req.params,
                    sender: "",
                    body: {
                        length: results?.length ?? 0,
                        data: results
                    }
                })
            } else {

            }
        } catch (err) {
            reject(err);
        }
    });
}

export const createProgressItemAdapter = async (req: Request): Promise<ResponseObject> => {
    return new Promise<ResponseObject>((resolve, reject) => {

        const db: DatabaseType = new Database('./progress.db');

        const stmt = db.prepare(`INSERT INTO progress (creationDate, mood)
                                 VALUES (1, 'Good'),
                                        (2, 'Very Bad')`);

        try {
            const result: RunResult = stmt.run();
            resolve({
                query: "/progress",
                params: req.params,
                sender: "",
                body: {
                    length: 1,
                    data: result
                }
            })
        } catch (err) {
            reject(err);
        }
    });
}

export const getAllNoteItemsAdapter = async (req: Request): Promise<ResponseObject> => {
    return new Promise<ResponseObject>((resolve, reject) => {

        const db: DatabaseType = new Database('./progress.db');

        const stmt = db.prepare(`SELECT *
                                 FROM note`);

        try {
            const results: any[] = stmt.all();
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
