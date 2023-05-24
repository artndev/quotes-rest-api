require("dotenv").config();
const i18n = require("i18n");
const mongoose = require("mongoose");
const QuoteModel = require("./Models/Quote.js");
const util = require("node:util")


module.exports = {
    saveQuote: async (req, res) => {
        i18n.setLocale(req.query.lang || 'en')
        const CONNECTION = await mongoose.connect(process.env.CONNECTION_URI);

        try {
            const arr = req.body.quotes;
            let state = true;
            for (let i = 0; i < arr.length; i++) {
                if (!state)
                    break;

                await (new QuoteModel({ author: arr[i].author, text: arr[i].text }))
                    .save()
                    .then(() => {
                        if (i === arr.length - 1)
                            res.status(200).json({
                                message: util.format(i18n.__("Цитаты успешно сохранены!"), arr.length)
                            });
                    })
                    .catch(() => {
                        res.status(400).json({
                            message: i18n.__("Не удалось сохранить цитаты.")
                        });
                        state = false;
                    })
            }
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
            await CONNECTION.disconnect()
            return res.statusCode;
        }
    },
    getQuote: async (req, res) => {
        i18n.setLocale(req.query.lang || 'en')
        const CONNECTION = await mongoose.connect(process.env.CONNECTION_URI);

        try {
            const doc = await QuoteModel.findById(req.params.id)
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
            await CONNECTION.disconnect()
            return res.statusCode;
        }
    },
    deleteQuote: async (req, res) => {
        i18n.setLocale(req.query.lang || 'en')
        const CONNECTION = await mongoose.connect(process.env.CONNECTION_URI);

        try {
            const doc = await QuoteModel.findOneAndDelete({ _id: req.params.id });
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
            await CONNECTION.disconnect()
            return res.statusCode;
        }
    },
    getRandomQuote: async (req, res) => {
        i18n.setLocale(req.query.lang || 'en')
        const CONNECTION = await mongoose.connect(process.env.CONNECTION_URI);

        try {
            const doc = await QuoteModel
                .find()
                .then((arr) => { 
                    return arr[Math.floor(Math.random() * arr.length)];
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
            await CONNECTION.disconnect()
            return res.statusCode;
        }
    },
    getAllQuotes: async (req, res) => {
        i18n.setLocale(req.query.lang || 'en')
        const CONNECTION = await mongoose.connect(process.env.CONNECTION_URI);

        try {
            const arr = await QuoteModel.find()
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
            await CONNECTION.disconnect()
            return res.statusCode;
        }
    }
    
}
