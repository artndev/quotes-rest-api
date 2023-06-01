require("dotenv").config();
const i18n = require("i18n");
const mongoose = require("mongoose");
const QuoteModel = require("./Models/Quote.js");
const util = require("node:util");
const { getRandomArbitrary } = require("../utils.js");


module.exports = {
    saveQuote: async (req, res) => {
        try {
            await mongoose.connect(process.env.CONNECTION_URI);

            const docs = req.body.quotes;
            let state = true;
            for (let i = 0; i < docs.length; i++) {
                await (new QuoteModel({ 
                    author: docs[i]["author"], 
                    text: docs[i]["text"], 
                    tags: docs[i]["tags"] 
                }))
                    .save()
                    .catch(() => {
                        state = false;
                    });

                if (!state) {
                    return res.status(400).json({
                        message: i18n.__("Не удалось сохранить цитаты.")
                    });
                }
                else if (i === docs.length - 1) {
                    return res.status(200).json({
                        message: util.format(i18n.__("Цитаты успешно сохранены!"), docs.length),
                        _arr: docs
                    });
                }
            }
        } 
        catch (err) {
            console.error(err);
    
            return res.status(500).json({
                message: i18n.__("Сервер не отвечает...")
            });
        }
        finally {
            await mongoose.disconnect();
        }
    },
    getQuote: async (req, res) => {
        try {
            await mongoose.connect(process.env.CONNECTION_URI);

            const doc = await QuoteModel.findById(req.params.id);
            if (doc) {
                return res.status(200).json({
                    message: i18n.__("Цитата успешно найдена!"),
                    _doc: doc
                });
            }
            else {
                return res.status(404).json({
                    message: i18n.__("Не удалось найти цитату.")
                });
            }
        }
        catch (err) {
            console.error(err);
    
            return res.status(500).json({
                message: i18n.__("Сервер не отвечает...")
            });
        }
        finally {
            await mongoose.disconnect();
        }
    },
    deleteQuote: async (req, res) => {
        try {
            await mongoose.connect(process.env.CONNECTION_URI);

            const doc = await QuoteModel.findOneAndDelete({ _id: req.params.id });
            if (doc) {
                return res.status(200).json({ 
                    message: i18n.__("Цитата успешно удалена!"),
                    _doc: doc
                });
            }
            else {
                return res.status(404).json({ 
                    message: i18n.__("Не получилось удалить цитату.") 
                });
            }
        }
        catch (err) {
            console.error(err);
    
            return res.status(500).json({ 
                message: i18n.__("Сервер не отвечает...") 
            });
        }
        finally {
            await mongoose.disconnect();
        }
    },
    getRandomQuote: async (_, res) => {
        try {
            await mongoose.connect(process.env.CONNECTION_URI);

            const arr = await QuoteModel.find();
            const doc = arr.at(getRandomArbitrary(0, arr.length - 1));
            if (doc) {
                return res.status(200).json({
                    message: i18n.__("Случайная цитата успешно получена!"),
                    _doc: doc
                });
            }
            else {
                return res.status(404).json({ 
                    message: i18n.__("Не удалось получить случайную цитату.")
                });
            }
        }
        catch (err) {
            console.error(err);
    
            return res.status(500).json({
                message: i18n.__("Сервер не отвечает...")
            });
        }
        finally {
            await mongoose.disconnect();
        }
    },
    getAllQuotes: async (_, res) => {
        try {
            await mongoose.connect(process.env.CONNECTION_URI);

            const docs = await QuoteModel.find();
            if (docs.length > 0) {
                return res.status(200).json({
                    message: i18n.__("Список цитат успешно получен!"),
                    _arr: docs
                });
            }
            else {
                return res.status(404).json({
                    message: i18n.__("Не удалось получить список цитат.")
                });
            }
        }
        catch (err) {
            console.error(err);
    
            return res.status(500).json({
                message: i18n("Сервер не отвечает...")
            });
        }
        finally {
            await mongoose.disconnect();
        }
    },
    getQuotesByTag: async (req, res) => {
        try {
            await mongoose.connect(process.env.CONNECTION_URI);

            const arr = await QuoteModel.find()
            const docs = arr.filter((quote) => { 
                return req.params.tag ? quote["tags"].includes(req.params.tag) : true
            });
            if (docs.length > 0) {
                return res.status(200).json({
                    message: i18n.__("Список цитат успешно получен!"),
                    _arr: docs
                });
            }
            else {
                return res.status(404).json({
                    message: i18n.__("Не удалось получить список цитат.")
                });
            }
        }
        catch (err) {
            console.error(err);
    
            return res.status(500).json({
                message: i18n.__("Сервер не отвечает...")
            });
        }
        finally {
            await mongoose.disconnect();
        }
    }
}
