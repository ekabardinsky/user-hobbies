import mongoose from "mongoose";

export enum HobbyPassionLevel {
    MEDIUM = "Medium",
    HIGH = "High",
    LOW = "Low",
    VERY_LOW = "Very-Low",
    VERY_HIGH = "Very-High"
}

export type HobbyDocument = mongoose.Document & {
    id: string;
    name: string;
    year: number;
    passionLevel: HobbyPassionLevel;
};

const hobbySchema = new mongoose.Schema({
    name: {type: String, required: true},
    year: {type: Number, required: true},
    passionLevel: {type: String, required: true}
}, {timestamps: true});

export type UserDocument = mongoose.Document & {
    id: number;
    name: string,
    hobbies: HobbyDocument[]
};

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    hobbies: [{type: mongoose.Schema.Types.ObjectId, ref: "Hobby"}]
}, {timestamps: true});

export const User = mongoose.model<UserDocument>("User", userSchema);
export const Hobby = mongoose.model<HobbyDocument>("Hobby", hobbySchema);

// set virtual id
userSchema.virtual("id").get(getId);
hobbySchema.virtual("id").get(getId);

function getId() {
    return this._id;
}