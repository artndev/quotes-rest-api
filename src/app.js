const express = require("express");
const i18n = require("i18n");
const rootPath = require("app-root-path")
const { saveQuoteValidation, idParamValidation } = require("./validations.js");
const { 
    deleteQuote, 
    getAllQuotes, 
    getQuote, 
    getRandomQuote, 
    saveQuote 
} = require("./controllers/Controller.js");
const handleValidationErrors = require("./handleValidationErrors.js");
const { verifyAuthToken } = require("./checkAuth.js");

const app = express();
i18n.configure({
    locales: [
        'ru', 'en',
        'es', 'fr',
        'zh', 'ja'
    ],
    directory: rootPath + "/src/locales"
})
app.use(express.json());
app.use(i18n.init)


app.get("/", (_, res) => {
    res.status(200).json({
        message: "The artndev's QUOTES-REST-API service. It's very simple and very useful!",
        commands: {
            getQuotes: "[GET] /quotes",
            getRandomQuote: "[GET] /random",
            getQuote: "[GET] /quotes/:id"
        },
        flags: {
            "?lang=": [
                'ru', 'en', 
                'es', 'fr',
                'zh', 'ja'
            ]
        }
    });
});
app.get("/random", getRandomQuote);
app.get("/quotes", getAllQuotes);
app.get("/quotes/:id", idParamValidation, handleValidationErrors, getQuote);
app.delete("/quotes/:id", verifyAuthToken, idParamValidation, handleValidationErrors, deleteQuote);
app.post("/quotes", verifyAuthToken, saveQuoteValidation, handleValidationErrors, saveQuote);

const PORT = process.env.PORT || 8000;
app.listen(PORT, (err) => {
    if (err) {
        console.error(err);
        return;
    }

    console.log(`Server on the port / Сервер на порту - ${PORT}!`);
});
