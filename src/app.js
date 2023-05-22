import express from "express";
import { saveQuoteValidation, idParamValidation } from "./validations.js";
import { deleteQuote, findQuote, saveQuote } from "./controllers/Controller.js";
import handleValidationErrors from "./handleValidationErrors.js";
const app = express();
app.use(express.json());


app.get("/", (_, res) => {
    res.status(200).json({ message: "The QUOTES-REST-API" })
});
app.post("/quotes", saveQuoteValidation, handleValidationErrors, saveQuote);
app.get("/quotes/:id", idParamValidation, handleValidationErrors, findQuote);
app.delete("/quotes/:id", idParamValidation, handleValidationErrors, deleteQuote)


app.listen(8000, (err) => {
    if (err) {
        console.error(err);
        return;
    }

    console.log("The server is listening on port 8000!");
});
