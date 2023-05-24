const { default: mongoose, Schema, model } = require("mongoose");


const QuoteSchema = new Schema(
    {
        _id: {
            type: String,
            required: false,
            unique: true,
            default: () => { return (new mongoose.Types.ObjectId).toString() }
        },
        author: {
            type: String,
            required: false,
            unique: false,
            default: "Unknown Author"
        },
        text: {
            type: String,
            required: true,
            unique: true
        }
    },
    { 
        collection: "quotes", 
        versionKey: false 
    }
)
module.exports = model("Quote", QuoteSchema)
