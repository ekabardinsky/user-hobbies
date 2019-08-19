import { Hobby, HobbyDocument } from "../models/User";
import { GenericCrudService } from "./GenericCrudService";
import UserService from "./UserService";

export default class HobbyService extends GenericCrudService<HobbyDocument> {
    userService: UserService;

    constructor() {
        super(Hobby);
        this.userService = new UserService();
    }

    getUsersHobbies = async (userId: String): Promise<HobbyDocument[]> => {
        return await this.userService
            .get(userId)
            .then(user => user.hobbies);
    };

    createUsersHobby = async (userId: String, hobby: HobbyDocument): Promise<HobbyDocument> => {
        const user = await this.userService.get(userId);
        // in case if user not exists
        if (user == undefined) return undefined;
        // create new hobby
        const newHobby = await this.create(hobby);
        // update user
        user.hobbies.push(newHobby);
        await user.save();
        // return
        return newHobby;
    };

    removeUsersHobby = async (userId: String, hobbyId: String): Promise<any> => {
        const user = await this.userService.get(userId);
        // in case if user not exists
        if (user == undefined) return undefined;
        // find the hobby
        const hobbyToDelete = user.hobbies.find(hobby => hobby.id == hobbyId);
        console.log(user);
        console.log(hobbyToDelete);
        // delete hobby
        if (hobbyToDelete) {
            return this.remove(hobbyToDelete.id);
        } else {
            return {deletedCount: 0};
        }
    };
}