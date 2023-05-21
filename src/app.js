import express from "express";
import { quoteValidation } from "./validations.js";
import { saveQuote } from "./controllers/DBController.js";
import handleValidationErrors from "./handleValidationErrors.js";
const app = express();
app.use(express.json());


app.get("/", (req, res) => {
    res.status(200).send(
       "The quotes REST-api"
    )
});
app.post("/new", quoteValidation, handleValidationErrors, saveQuote);


app.listen(8000, (err) => {
    if (err) {
        console.error(err)
        return
    }

    console.log("The server is listening on port 8000!")
});
