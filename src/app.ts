import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import bluebird from "bluebird";
import { MONGODB_URI } from "./util/Secrets";
// Controllers (route handlers)
import UserController from "./controllers/UserController";
import asyncMiddleware from "./util/AsyncMiddleware";
import HobbyController from "./controllers/HobbyController";

// Connect to MongoDB
const mongoUrl = MONGODB_URI;
(<any>mongoose).Promise = bluebird;
mongoose.connect(mongoUrl).then(
    () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
    },
).catch(err => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
    process.exit();
});

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());

/**
 * Primary app routes.
 */
// users
const userController = new UserController();
app.get("/api/users", asyncMiddleware(userController.list));
app.post("/api/users", asyncMiddleware(userController.create));
app.get("/api/users/:id", asyncMiddleware(userController.get));
app.put("/api/users/:id", asyncMiddleware(userController.update));
app.delete("/api/users/:id", asyncMiddleware(userController.remove));

// hobbies
const hobbyController = new HobbyController();
app.get("/api/hobbies", asyncMiddleware(hobbyController.list));
app.get("/api/hobbies/:id", asyncMiddleware(hobbyController.get));
app.put("/api/hobbies/:id", asyncMiddleware(hobbyController.update));
app.delete("/api/hobbies/:id", asyncMiddleware(hobbyController.remove));

// user hobbies
app.get("/api/users/:userId/hobbies", asyncMiddleware(hobbyController.getUsersHobbies));
app.post("/api/users/:userId/hobbies", asyncMiddleware(hobbyController.createUsersHobby));
app.delete("/api/users/:userId/hobbies/:hobbyId", asyncMiddleware(hobbyController.removeUsersHobby));

export default app;