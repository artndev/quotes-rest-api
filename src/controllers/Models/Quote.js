import mongoose, { Schema, model } from "mongoose";


export default model("Quote", new Schema(
    {
        _id: {
            type: String,
            required: false,
            unique: true,
            default: new mongoose.Types.ObjectId().toString()
        },
        author: {
            type: String,
            required: false,
            default: "Unknown Author"
        },
        text: {
            type: String,
            required: true,
            unique: true,
        }
    },
    { 
        collection: "quotes", 
        versionKey: false 
    }
));
