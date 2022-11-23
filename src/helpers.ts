import {Request} from "express";
import {ResponseError} from "./interfaces";

export const parameterErrorResponse = (req: Request): ResponseError => ({
    query: req.url,
    params: req.params,
    sender: "Service",
    error: new Error("Didn't provided necessary parameters")
})

export const databaseEmptyStatementResponse = (req: Request): ResponseError => ({
    query: req.query,
    params: req.params,
    sender: "Service",
    error: new Error("Error with empty statement after query!")
})

export const databaseEmptyResultResponse = (req: Request): ResponseError => ({
    query: req.query,
    params: req.params,
    sender: "Service",
    error: new Error("Error with empty result after running statement!")
})

export const databaseCreateErrorResponse = (req: Request): ResponseError => ({
    query: req.query,
    params: req.params,
    sender: "Service",
    error: new Error("Error while creating table in database")
})