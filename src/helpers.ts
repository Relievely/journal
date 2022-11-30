import {Request} from "express";
import {ResponseObject} from "./interfaces";
import Database from "better-sqlite3";

export const responseObjectItem = <T>(req: Request, obj: T): ResponseObject<T> => ({
    url: req.url,
    route: req.route as object,
    query: req.query,
    params: req.params,
    body: req.body as object,
    accepted: req.accepted,
    data: {
        length: 1,
        value: obj
    }
});

export const responseObjectItems = <T>(req: Request, obj: T[]): ResponseObject<T[]> => ({
    url: req.baseUrl,
    route: req.route as object,
    query: req.query,
    params: req.params,
    body: req.body as object,
    accepted: req.accepted,
    data: {
        length: obj.length,
        value: obj
    }
});

export const responseError = <T>(req: Request, err: string): ResponseObject<T> => ({
    url: req.baseUrl,
    route: req.route as object,
    query: req.query,
    params: req.params,
    body: req.body as object,
    accepted: req.accepted,
    error: err
});

export const emptyStatementResponse = new Error("Error with empty statement after query!")

export const emptyResultResponse = new Error("Error with empty result after running statement!");

export const emptyItemResponse = new Error("Error white empty item before inserting values");

export const databaseCreateErrorResponse = "Error while creating table in database"

export const insufficientParametersError = () => new Error("Error while checking validity of parameters");

export const serviceDB = new Database('./progress.db');

export const parametersIncluded = <T>(req: Request, ...params: T[]) => {
    return !params.find((p: T) => req.params[p.toString()] === undefined);
}