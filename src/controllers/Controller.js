import dotenv from "dotenv";
dotenv.config();
import mongoose, { MongooseError } from "mongoose";
import { Quote } from "./Models/Quote.js";


export const saveQuote = async (req, res) => {
    try {
        await mongoose.connect(process.env.CONNECTION_URI);

        const doc = await new Quote({
            author: req.body.author,
            text: req.body.text
        }).save()
        if (doc) {
            res.status(200).json({
                message: "Цитата успешно сохранена!",
                result: {
                    code: res.statusCode,
                }
            });
            return;
        }
        else
            throw new Error;
    } 
    catch (err) {
        if (err instanceof Error) {
            console.error(err);

            res.status(500).json({
                message: "Не удалось сохранить цитату.",
                error: {
                    code: res.statusCode,
                    name: err.name,
                }
            });
        }
        return;
    }
}


export const getQuote = async (req, res) => {
    try {
        await mongoose.connect(process.env.CONNECTION_URI);

        const doc = await Quote.findById(req.params.id)
        if (doc) {
            res.status(200).json({
                message: "Цитата найдена!",
                result: {
                    code: res.statusCode,
                    _doc: doc,
                }
            });
            return;
        }
        else
            throw new MongooseError;
    }
    catch (err) {
        if (err instanceof Error) {
            console.error(err);

            res.status(404).json({
                message: "Не удалось найти цитату.",
                error: {
                    code: res.statusCode,
                    name: err.name,
                }
            });
        }
        return;
    }
}


export const deleteQuote = async (req, res) => {
    try {
        await mongoose.connect(process.env.CONNECTION_URI);

        const doc = await Quote.deleteOne({ _id: req.params.id });
        if (doc.deletedCount > 0) {
            res.status(200).json({
                message: "Цитата успешно удалена!",
                result: {
                    code: res.statusCode,
                }
            });
            return;
        }
        else
            throw new MongooseError;
    }
    catch (err) {
        if (err instanceof Error) {
            console.error(err);

            res.status(404).json({
                message: "Не получилось удалить цитату.",
                error: {
                    code: res.statusCode,
                    name: err.name,
                }
            });
        }
        return;
    }
}


export const getRandomQuote = async (_, res) => {
    try {
        await mongoose.connect(process.env.CONNECTION_URI);

        const arr = await Quote.find()
        if (arr.length > 0) {
            const doc = arr[Math.floor(Math.random() * arr.length)]

            res.status(200).json({
                message: "Случайная цитата получена!",
                result: {
                    code: res.statusCode,
                    _doc: doc,
                }
            });
            return;
        }
        else
            throw new MongooseError;
    }
    catch (err) {
        if (err instanceof Error) {
            console.error(err);

            res.status(404).json({
                message: "Не удалось получить случайную цитату.",
                error: {
                    code: res.statusCode,
                    name: err.name,
                }
            });
        }
        return;
    }
}