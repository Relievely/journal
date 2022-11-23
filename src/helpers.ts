import {Request} from "express";
import {ResponseObject} from "./interfaces";

export const parameterErrorResponse = (req: Request): ResponseObject => ({
    query: req.url,
    params: req.params,
    sender: "Service",
    body: {
        length: 4,
        data: {"error": "Didn't provided necessary parameters"}
    },
})

export const databaseEmptyStatementResponse = (req: Request): ResponseObject => ({
    query: req.query,
    params: req.params,
    sender: "Service",
    error: new Error("Error with empty statement after query!")
})

export const databaseEmptyResultResponse = (req: Request): ResponseObject => ({
    query: req.query,
    params: req.params,
    sender: "Service",
    error: new Error("Error with empty result after running statement!")
})

export const databaseCreateErrorResponse = (req: Request): ResponseObject => ({
    query: req.query,
    params: req.params,
    sender: "Service",
    error: new Error("Error while creating table in database")
})