const express = require("express");
const i18n = require("i18n");
const rootPath = require("app-root-path");
const { saveQuoteValidation, idParamValidation } = require("./valids.js");
const { 
    deleteQuote, 
    getAllQuotes, 
    getQuote, 
    getRandomQuote, 
    saveQuote 
} = require("./controllers/db_controller.js");
const { verifyAuthToken } = require("./auth.js");
const { setLocale, handleValidationErrors } = require("./utils.js")

const app = express();
i18n.configure({
    locales: ['ru', 'en', 'es', 'fr', 'zh', 'ja'],
    directory: rootPath + "/src/locales"
})
app.use(express.json());
app.use(i18n.init)


app.get("/", setLocale, (_, res) => {
    res.status(200).json({
        message: i18n.__("The artndev's QUOTES-REST-API service. It's very simple and very useful!"),
        commands: {
            getQuotes: "[GET] /quotes",
            getRandomQuote: "[GET] /random",
            getQuote: "[GET] /quotes/:id"
        },
        flags: {
            "?lang=": ['ru', 'en', 'es', 'fr', 'zh', 'ja']
        }
    });
});
app.get("/random", setLocale, getRandomQuote);
app.get("/quotes", setLocale, getAllQuotes);
app.get("/quotes/:id", setLocale, idParamValidation, handleValidationErrors, getQuote);
app.delete("/quotes/:id", setLocale, verifyAuthToken, idParamValidation, handleValidationErrors, deleteQuote);
app.post("/quotes", setLocale, verifyAuthToken, saveQuoteValidation, handleValidationErrors, saveQuote);

const PORT = process.env.PORT || 8000;
app.listen(PORT, (err) => {
    if (err) {
        console.error(err);
        return;
    }

    console.log(`Server on the port / Сервер на порту - ${PORT}!`);
});
