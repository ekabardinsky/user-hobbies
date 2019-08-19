import { Request, Response } from "express";
import logger from "./Logger";
import { getFailure, ResponseWrapper } from "./ResponseWrapper";

export default function asyncMiddleware(controllerMethod: (req: Request, res: Response) => Promise<ResponseWrapper<any>>) {
    return async (req: Request, res: Response) => {
        logger.info(`Request "${req.path}":`, {
            headers: req.headers,
            body: req.body,
            query: req.query,
            params: req.params
        });
        try {
            const result = await controllerMethod(req, res);
            logger.info(`Response from "${req.path}":`, result);
            res.status(result.code);
            return res.json(result);
        } catch (e) {
            logger.error(`Error occurred`, e);
            res.status(500);
            return res.json(getFailure<Error>(500, e));
        }
    };
}