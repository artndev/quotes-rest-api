import dotenv from "dotenv";
dotenv.config();
import mongoose, { MongooseError } from "mongoose";
import Quote from "./Models/Quote.js";


export const saveQuote = async (req, res) => {
    try {
        await mongoose.connect(process.env.CONNECTION_URI);

        const doc = await new Quote({ author: req.body.author, text: req.body.text }).save()
        if (doc)
            res.status(200).json({
                message: "Цитата сохранена!",
                _doc: doc
            });
        else
            throw new MongooseError;
    } 
    catch (err) {
        if (err instanceof Error) {
            console.error(err);

            res.status(500).json({
                message: "Сервер не отвечает..."
            });
        }
    }
    finally {
        return res.statusCode;
    }
}


export const getQuote = async (req, res) => {
    try {
        await mongoose.connect(process.env.CONNECTION_URI);

        const doc = await Quote.findById(req.params.id)
        if (doc)
            res.status(200).json({
                message: "Цитата найдена!",
                _doc: doc
            });
        else
            res.status(404).json({
                message: "Не удалось найти цитату."
            });
    }
    catch (err) {
        if (err instanceof Error) {
            console.error(err);

            res.status(500).json({
                message: "Сервер не отвечает...",
            });
        }
    }
    finally {
        return res.statusCode;
    }
}


export const deleteQuote = async (req, res) => {
    try {
        await mongoose.connect(process.env.CONNECTION_URI);

        const doc = await Quote.findOneAndDelete({ _id: req.params.id });
        if (doc)
            res.status(200).json({ 
                message: "Цитата успешно удалена!",
                _doc: doc
            });
        else
            res.status(404).json({ 
                message: "Не получилось удалить цитату." 
            });
    }
    catch (err) {
        if (err instanceof Error) {
            console.error(err);

            res.status(500).json({ 
                message: "Сервер не отвечает..." 
            });
        }
    }
    finally {
        return res.statusCode;
    }
}


export const getRandomQuote = async (_, res) => {
    try {
        await mongoose.connect(process.env.CONNECTION_URI);

        const doc = await Quote.find().then((arr) => { return arr[Math.floor(Math.random() * arr.length)] })
        if (doc)
            res.status(200).json({
                message: "Случайная цитата получена!",
                _doc: doc
            });
        else
            res.status(404).json({ 
                message: "Не удалось получить случайную цитату." 
            });
    }
    catch (err) {
        if (err instanceof Error) {
            console.error(err);

            res.status(500).json({
                message: "Сервер не отвечает...",
            });
        }
    }
    finally {
        return res.statusCode;
    }
}


export const getAllQuotes = async (_, res) => {
    try {
        await mongoose.connect(process.env.CONNECTION_URI);

        const arr = await Quote.find()
        res.status(200).json({
            message: "Список цитат получен!",
            _arr: arr
        });
    }
    catch (err) {
        if (err instanceof Error) {
            console.error(err);

            res.status(500).json({
                message: "Сервер не отвечает...",
            });
        }
    }
    finally {
        return res.statusCode;
    }
}
