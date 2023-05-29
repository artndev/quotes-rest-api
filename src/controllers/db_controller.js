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

            const arr = req.body.quotes;
            let state = true;
            for (let i = 0; i < arr.length; i++) {
                if (!state)
                    break;
                
                const q = arr[i];
                const doc = new QuoteModel({ author: q["author"], text: q["text"] });
                await doc.save()
                    .catch(() => {
                        res.status(500).json({
                            message: i18n.__("Не удалось сохранить цитаты.")
                        });
                        state = false;
                    });

                if (i === arr.length - 1) {
                    res.status(200).json({
                        message: util.format(i18n.__("Цитаты успешно сохранены!"), arr.length),
                        _arr: arr
                    });
                    break;
                }
            }
            return;
        } 
        catch (err) {
            console.error(err);
    
            res.status(500).json({
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
                res.status(200).json({
                    message: i18n.__("Цитата успешно найдена!"),
                    _doc: doc
                });
            }
            else {
                res.status(404).json({
                    message: i18n.__("Не удалось найти цитату.")
                });
            }
            return;
        }
        catch (err) {
            console.error(err);
    
            res.status(500).json({
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
                res.status(200).json({ 
                    message: i18n.__("Цитата успешно удалена!"),
                    _doc: doc
                });
            }
            else {
                res.status(404).json({ 
                    message: i18n.__("Не получилось удалить цитату.") 
                });
            }
            return;
        }
        catch (err) {
            console.error(err);
    
            res.status(500).json({ 
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
                res.status(200).json({
                    message: i18n.__("Случайная цитата успешно получена!"),
                    _doc: doc
                });
            }
            else {
                res.status(404).json({ 
                    message: i18n.__("Не удалось получить случайную цитату.")
                });
            }
            return;
        }
        catch (err) {
            console.error(err);
    
            res.status(500).json({
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

            const arr = await QuoteModel.find()
            if (arr.length > 0) {
                res.status(200).json({
                    message: i18n.__("Список цитат успешно получен!"),
                    _arr: arr
                });
            }
            else {
                res.status(404).json({
                    message: i18n.__("Не удалось получить список цитат.")
                });
            }
            return;
        }
        catch (err) {
            console.error(err);
    
            res.status(500).json({
                message: i18n("Сервер не отвечает..."),
            });
        }
        finally {
            await mongoose.disconnect();
        }
    }
    
}
