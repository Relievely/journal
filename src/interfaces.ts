import {ParamsDictionary} from "express-serve-static-core";
import {RunResult} from "better-sqlite3";
import {MoodType} from "./enums";

export interface ResponseObject<T> {
    query: string | any
    params: string[] | ParamsDictionary
    sender: string | number
    status?: string
    body?: {
        length: number
        data: T
    },
    error?: Error
}

export interface ProgressItem {
    id: number,
    creationDate: number,
    mood: MoodType
}

export interface NoteItem {
    id: number,
    content: string,
    progressID: number
}