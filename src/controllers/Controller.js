require("dotenv").config();
const i18n = require("i18n");
const mongoose = require("mongoose");
const Quote = require("./Models/Quote.js");


module.exports = {
    saveQuote: async (req, res) => {
        try {
            i18n.setLocale(req.query.lang || 'en')
            await mongoose.connect(process.env.CONNECTION_URI);
    
            const doc = await new Quote({ author: req.body.author, text: req.body.text })
                .save()
                .catch(() => { 
                    return undefined;
                });
            if (doc)
                res.status(200).json({
                    message: i18n.__("Цитата успешно сохранена!"),
                    _doc: doc
                });
            else 
                res.status(400).json({
                    message: "Не удалось сохранить цитату."
                });
        } 
        catch (err) {
            if (err instanceof Error) {
                console.error(err);
    
                res.status(500).json({
                    message: i18n.__("Сервер не отвечает...")
                });
            }
        }
        finally {
            return res.statusCode;
        }
    },
    getQuote: async (req, res) => {
        try {
            i18n.setLocale(req.query.lang || 'en')
            await mongoose.connect(process.env.CONNECTION_URI);
    
            const doc = await Quote.findById(req.params.id)
            if (doc)
                res.status(200).json({
                    message: i18n.__("Цитата успешно найдена!"),
                    _doc: doc
                });
            else
                res.status(404).json({
                    message: i18n.__("Не удалось найти цитату.")
                });
        }
        catch (err) {
            if (err instanceof Error) {
                console.error(err);
    
                res.status(500).json({
                    message: i18n.__("Сервер не отвечает...")
                });
            }
        }
        finally {
            return res.statusCode;
        }
    },
    deleteQuote: async (req, res) => {
        try {
            i18n.setLocale(req.query.lang || 'en')
            await mongoose.connect(process.env.CONNECTION_URI);
    
            const doc = await Quote.findOneAndDelete({ _id: req.params.id });
            if (doc)
                res.status(200).json({ 
                    message: i18n.__("Цитата успешно удалена!"),
                    _doc: doc
                });
            else
                res.status(404).json({ 
                    message: i18n.__("Не получилось удалить цитату.") 
                });
        }
        catch (err) {
            if (err instanceof Error) {
                console.error(err);
    
                res.status(500).json({ 
                    message: i18n.__("Сервер не отвечает...") 
                });
            }
        }
        finally {
            return res.statusCode;
        }
    },
    getRandomQuote: async (req, res) => {
        try {
            i18n.setLocale(req.query.lang || 'en')
            await mongoose.connect(process.env.CONNECTION_URI);
    
            const doc = await Quote
                .find()
                .then((arr) => { 
                    return arr[Math.floor(Math.random() * arr.length)] ;
                });
            if (doc)
                res.status(200).json({
                    message: i18n.__("Случайная цитата успешно получена!"),
                    _doc: doc
                });
            else
                res.status(404).json({ 
                    message: i18n.__("Не удалось получить случайную цитату.")
                });
        }
        catch (err) {
            if (err instanceof Error) {
                console.error(err);
    
                res.status(500).json({
                    message: i18n.__("Сервер не отвечает...")
                });
            }
        }
        finally {
            return res.statusCode;
        }
    },
    getAllQuotes: async (req, res) => {
        try {
            i18n.setLocale(req.query.lang || 'en')
            await mongoose.connect(process.env.CONNECTION_URI);
    
            const arr = await Quote.find()
            if (arr.length > 0)
                res.status(200).json({
                    message: i18n.__("Список цитат успешно получен!"),
                    _arr: arr
                });
            else
                res.status(404).json({
                    message: i18n.__("Не удалось получить список цитат.")
                });
        }
        catch (err) {
            if (err instanceof Error) {
                console.error(err);
    
                res.status(500).json({
                    message: i18n("Сервер не отвечает..."),
                });
            }
        }
        finally {
            return res.statusCode;
        }
    }
    
}
