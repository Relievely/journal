import {ParamsDictionary} from "express-serve-static-core";
import {RunResult} from "better-sqlite3";

export interface ResponseObject {
    query: string | any
    params: string[] | ParamsDictionary
    sender: string | number
    status?: string
    body?: {
        length: number
        data: object | RunResult | RunResult[]
    },
    error?: Error
}