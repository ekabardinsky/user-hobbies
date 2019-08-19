import { GenericCrudController } from "./GenericCrudController";
import { HobbyDocument } from "../models/User";
import HobbyService from "../services/HobbyService";
import { Request, Response } from "express";
import { getFailure, getSuccess, ResponseWrapper } from "../util/ResponseWrapper";

export default class HobbyController extends GenericCrudController<HobbyDocument, HobbyService> {
    constructor() {
        super(new HobbyService());
    }

    getUsersHobbies = async (req: Request, res: Response): Promise<ResponseWrapper<HobbyDocument[]>> => {
        return await this.service
            .getUsersHobbies(req.params.userId)
            .then(getSuccess);
    };

    createUsersHobby = async (req: Request, res: Response): Promise<ResponseWrapper<HobbyDocument>> => {
        return await this.service
            .createUsersHobby(req.params.userId, req.body)
            .then(getSuccess);
    };

    removeUsersHobby = async (req: Request, res: Response): Promise<ResponseWrapper<any>> => {
        return await this.service
            .removeUsersHobby(req.params.userId, req.params.hobbyId)
            .then(entity => {
                if (entity.deletedCount === 0) {
                    return getFailure(400, {message: "Entity not found"});
                } else {
                    return getSuccess({});
                }
            });
    };
}
