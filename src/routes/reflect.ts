import {Router} from "express";
import {getItemsController} from "../middleware/controller/reflectController";

export const reflect = Router();

reflect
    .get("/", getItemsController);