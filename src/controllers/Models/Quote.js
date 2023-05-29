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
        author: {
            type: String,
            required: false,
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
module.exports = model("Quote", quoteSchema)
