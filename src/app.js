import express from "express";
import { saveQuoteValidation, idParamValidation } from "./validations.js";
import { deleteQuote, getQuote, getRandomQuote, saveQuote } from "./controllers/Controller.js";
import handleValidationErrors from "./handleValidationErrors.js";
import { verifyAuthToken } from "./utils.js";
const app = express();
app.use(express.json());


app.get("/", (_, res) => {
    res.status(200).json({
        message: "The QUOTES-REST-API service. It's very simple but very useful!",
        description: {
            getRandomQuote: "[GET] /random",
            getQuote: "[GET] /quotes/:id"
        }
    });
});
app.get("/random", getRandomQuote);
app.get("/quotes/:id", idParamValidation, handleValidationErrors, getQuote);
app.post("/quotes", verifyAuthToken, saveQuoteValidation, handleValidationErrors, saveQuote);
app.delete("/quotes/:id", verifyAuthToken, idParamValidation, handleValidationErrors, deleteQuote);

const PORT = process.env.PORT || 8000;
app.listen(PORT, (err) => {
    if (err) {
        console.error(err);
        return;
    }

    console.log(`Сервер на порту - ${PORT}!`);
});
