import { Schema, model } from "mongoose";


export const Quote = model("Quote", new Schema(
    {
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
    { collection: "quotes" }
))