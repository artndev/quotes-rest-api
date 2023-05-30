const { default: mongoose, Schema, model } = require("mongoose");


const quoteSchema = new Schema(
    {
        _id: {
            type: String,
            required: false,
            unique: true,
            default: () => { 
                const objectId = new mongoose.Types.ObjectId();

                return objectId.toString();
            }
        },
        text: {
            type: String,
            required: true,
            unique: true
        },
        author: {
            type: String,
            required: false,
            default: "Unknown"
        },
        tags: {
            type: Array,
            of: String,
            required: false,
            default: []
        }
    },
    { 
        collection: "quotes", 
        versionKey: false 
    }
)
module.exports = model("Quote", quoteSchema)
