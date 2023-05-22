import dotenv from "dotenv";
dotenv.config();
import mongoose, { isValidObjectId } from "mongoose";
import { Quote } from "./Models/Quote.js";


export const saveQuote = async (req, res) => {
    try {
        await mongoose.connect(process.env.CONNECTION_URI);

        const doc = await (new Quote({
            author: req.body.author,
            text: req.body.text
        })).save()
        if (doc) {
            res.status(200).json({
                message: "Цитата успешно сохранена",
                result: {
                    code: res.statusCode,
                    quote: doc
                }
            });
            return doc;
        }
        else {
            res.status(400).json({
                message: "Не удалось сохранить цитату",
                error: {
                    code: res.statusCode
                }
            });
            return null;
        }
    } 
    catch (err) {
        if (err instanceof Error) {
            console.error(err);

            res.status(400).json({
                message: "Не удалось сохранить цитату",
                error: {
                    name: err.name,
                    code: res.statusCode
                }
            });
        }
        return null;
    }
}


export const findQuote = async (req, res) => {
    try {
        await mongoose.connect(process.env.CONNECTION_URI);

        const doc = await Quote.findById(req.params.id)
        if (doc) {
            res.status(200).json({
                message: "Цитата успешно найдена",
                result: {
                    code: res.statusCode,
                    quote: doc
                }
            });
            return doc;
        }
        else {
            res.status(404).json({
                message: "Не удалось найти цитату",
                error: {
                    code: res.statusCode
                }
            });
            return null;
        }
    } 
    catch (err) {
        if (err instanceof Error) {
            console.error(err);

            res.status(500).json({
                message: "Не удалось найти цитату",
                error: {
                    name: err.name,
                    code: res.statusCode
                }
            });
        }
        return null;
    }
}


export const deleteQuote = async (req, res) => {
    try {
        await mongoose.connect(process.env.CONNECTION_URI);

        const doc = await Quote.findByIdAndDelete(req.params.id)
        if (doc) {
            res.status(200).json({
                message: "Цитата успешно удалена",
                result: {
                    code: res.statusCode,
                    quote: doc
                }
            });
            return doc;
        }
        else {
            res.status(404).json({
                message: "Не удалось найти цитату",
                error: {
                    code: res.statusCode
                }
            });
            return null;
        }
    }
    catch (err) {
        if (err instanceof Error) {
            console.error(err);

            res.status(500).json({
                message: "Не получилось удалить цитату",
                error: {
                    name: err.name,
                    code: res.statusCode
                }
            });
        }
        return null;
    }
}