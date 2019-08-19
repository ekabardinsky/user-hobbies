import { Request, Response } from "express";
import { Document } from "mongoose";
import { GenericCrudService } from "../services/GenericCrudService";
import { getFailure, getSuccess, ResponseWrapper } from "../util/ResponseWrapper";

export class GenericCrudController<T extends Document, S extends GenericCrudService<T>> {
    service: S;

    constructor(service: S) {
        this.service = service;
    }

    list = async (req: Request, res: Response): Promise<ResponseWrapper<T[]>> => {
        return await this.service
            .list({})
            .then(getSuccess);
    };

    get = async (req: Request, res: Response): Promise<ResponseWrapper<T>> => {
        return await this.service
            .get(req.params.id)
            .then(entity => {
                if (entity == undefined) {
                    return getFailure(400, {message: "Entity not found"});
                } else {
                    return getSuccess(entity);
                }
            });
    };

    create = async (req: Request, res: Response): Promise<ResponseWrapper<T>> => {
        return await this.service
            .create(req.body)
            .then(getSuccess);
    };

    update = async (req: Request, res: Response): Promise<ResponseWrapper<any>> => {
        return await this.service
            .update({id: req.params.id, ...req.body})
            .then(entity => {
                if (entity.nModified === 0) {
                    return getFailure(400, {message: "Entity not found"});
                } else {
                    return getSuccess({});
                }
            });
    };

    remove = async (req: Request, res: Response): Promise<ResponseWrapper<any>> => {
        return await this.service
            .remove(req.params.id)
            .then(entity => {
                if (entity.deletedCount === 0) {
                    return getFailure(400, {message: "Entity not found"});
                } else {
                    return getSuccess({});
                }
            });
    };
}