import {Request} from "express";
import {ResponseObject} from "../../../interfaces";
import {RunResult} from "better-sqlite3";
import {databaseCreateErrorResponse, responseObjectItems, serviceDB} from "../../../helpers";

export const createTablesAdapter = async (req: Request): Promise<ResponseObject<RunResult[]>> => {
    return new Promise<ResponseObject<RunResult[]>>((resolve, reject) => {
        const endResult: RunResult[] = [];

        const createProgressTable = serviceDB.prepare(`CREATE TABLE IF NOT EXISTS progress
                                                (
                                                    id           INTEGER                                                                   NOT NULL
                                                        PRIMARY KEY AUTOINCREMENT,
                                                    creationDate INTEGER                                                                   NOT NULL,
                                                    mood         TEXT CHECK ( mood IN ('Very Bad', 'Bad', 'Medium', 'Good', 'Very Good') ) NOT NULL
                                                );`);

        const createNotesTable = serviceDB.prepare(`CREATE TABLE IF NOT EXISTS note
                                             (
                                                 id         INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                                                 content    TEXT    NOT NULL,
                                                 progressID INTEGER NOT NULL,
                                                 FOREIGN KEY(progressID) REFERENCES progress(id)
                                             )
        `)

        serviceDB.transaction(() => {
            const cResult: RunResult = createProgressTable.run();
            if (cResult) {
                endResult.push(cResult)
            } else {
                reject(databaseCreateErrorResponse);
            }
            const dResult: RunResult = createNotesTable.run();
            if (dResult) {
                endResult.push(dResult);
            } else {
                reject(databaseCreateErrorResponse);
            }
        })();

        resolve(responseObjectItems<RunResult>(req, endResult))
    })
}