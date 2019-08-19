import { User, UserDocument } from "../models/User";
import { GenericCrudService } from "./GenericCrudService";
import HobbyService from "./HobbyService";

export default class UserService extends GenericCrudService<UserDocument> {
    constructor() {
        super(User);
    }

    private getHobbies = async (user: any) => {
        if (user.hobbies && user.hobbies.length) {
            return await new HobbyService().list({_id: {$in: user.hobbies}});
        } else {
            return [];
        }
    };

    findCallback = async (users: UserDocument[]) => {
        // pick up sub models
        return Promise.all(
            users
                .map((user: UserDocument) => {
                    return this.getHobbies(user)
                        .then(hobbies => user.hobbies = hobbies)
                        .then(hobbies => user);
                })
        );
    };

    findOneCallback = async (user: UserDocument) => {
        // pick up sub models
        if (user && user.hobbies) {
            user.hobbies = await this.getHobbies(user);
        }

        return user;
    };
}