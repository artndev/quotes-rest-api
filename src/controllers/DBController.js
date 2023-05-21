import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import { Quote } from "./Models/Quote.js";


export const saveQuote = async (req, res) => {
    try {
        await mongoose.connect(process.env.CONNECTION_URI);

        const doc = await (new Quote({
            author: req.body.author,
            text: req.body.text
        })).save();
        if (doc) {
            res.status(200).json({
                message: "Цитата успешно сохранена",
                quote: doc
            });
            return doc;
        }
        else {
            res.status(500).json({
                message: "Не удалось сохранить цитату"
            });
            return null;
        }
    } 
    catch (err) {
        if (err instanceof Error) {
            console.error(err);

            res.status(400).json({
                message: "Такая цитата уже есть!",
                description: err.name
            });
        }
        return null;
    }
}
