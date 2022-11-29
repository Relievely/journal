import {ParamsDictionary} from "express-serve-static-core";
import {MoodType} from "./enums";
import QueryString from "qs";
import {MediaType} from "express";

type ReqBody = any;

export interface ResponseObject<T> {
    url: string,
    route: any,
    query: QueryString.ParsedQs,
    params: ParamsDictionary,
    body: ReqBody,
    accepted: MediaType[],
    status?: string
    data?: {
        length: number
        value: T
    },
    error?: string
}

export interface ResponseError {
    query: string | any
    params: string[] | ParamsDictionary
    sender: string | number
    status?: string
    error: string
}

export interface ProgressItem {
    id?: number,
    creationDate: number,
    mood: MoodType
}

export interface NoteItem {
    id?: number,
    content: string,
    progressID: number
}