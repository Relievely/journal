import {Request} from "express";
import {NoteItem, ResponseObject} from "../../../interfaces";
import Database, {Database as DatabaseType, RunResult} from "better-sqlite3";

export const getAllNoteItemsAdapter = async (req: Request): Promise<ResponseObject<NoteItem[]>> => {
    return new Promise<ResponseObject<NoteItem[]>>((resolve, reject) => {

        const db: DatabaseType = new Database('./progress.db');

        const stmt = db.prepare(`SELECT * FROM note`);

        try {
            const results: NoteItem[] = stmt.all() as NoteItem[];
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

export const getNoteItemAdapter = async (req: Request) => {

}

export const addNoteItemAdapter = async (req: Request) => {

}

export const deleteNoteItemAdapter = async (req: Request) => {

}