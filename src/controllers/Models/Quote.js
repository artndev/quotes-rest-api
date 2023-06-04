const { default: mongoose, Schema, model } = require("mongoose");


const quoteSchema = new Schema(
    {
        _id: {
            type: String,
            required: false,
            unique: true,
            default: () => (new mongoose.Types.ObjectId()).toString()
        },
        text: {
            type: String,
            required: true,
            unique: true
        },
        author: {
            type: String,
            required: false,
            default: "Unknown Author"
        },
        tags: {
            type: Array,
            of: String,
            required: false,
            default: ["none"]
        }
    },
    { 
        collection: "quotes", 
        versionKey: false 
    }
)
module.exports = model("Quote", quoteSchema)
