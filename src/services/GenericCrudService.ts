import { Document, Model } from "mongoose";

export class GenericCrudService<T extends Document> {
    model: Model<T>;
    findCallback: any;
    findOneCallback: any;

    constructor(entityModel: Model<T>) {
        this.model = entityModel;
    }

    list = async (args: any): Promise<T[]> => {
        return await this.model
            .find(args)
            .exec()
            .then(async entities => {
                return this.findCallback ? await this.findCallback(entities) : entities;
            });
    };

    get = async (id: String): Promise<T> => {
        return this.model
            .findOne({_id: id})
            .exec()
            .then(async entity => {
                return this.findOneCallback ? await this.findOneCallback(entity) : entity;
            });
    };

    create = async (entity: T): Promise<T> => {
        return this.model
            .create(entity);
    };

    update = async (entity: T): Promise<any> => {
        return this.model
            .update({_id: entity.id}, entity)
            .exec();
    };

    remove = async (id: String): Promise<any> => {
        return this.model
            .deleteOne({_id: id})
            .exec();
    };
}
