import { GenericCrudController } from "./GenericCrudController";
import { UserDocument } from "../models/User";
import UserService from "../services/UserService";

export default class UserController extends GenericCrudController<UserDocument, UserService> {
    constructor() {
        super(new UserService());
    }
}
