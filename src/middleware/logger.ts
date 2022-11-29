import {Request, Response, NextFunction} from "express";

export const logger = (req: Request, res: Response, next: NextFunction) => {
    req.log.info(`Params: []`);
    next();
}