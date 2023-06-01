//const timeout = require('connect-timeout');
const express = require('express');
const router = express.Router();
const { saveQuoteValidation, idParamValidation } = require("../valids.js");
const { 
    deleteQuote, 
    getAllQuotes, 
    getQuote, 
    saveQuote
} = require("../controllers/Controller.js");
const { verifyAuthToken } = require("../auth.js");
const { setLocale, handleValidationErrors } = require("../utils.js");


//router.use(timeout("100s"));
router.get("/", setLocale, getAllQuotes);
router.get("/:id", setLocale, idParamValidation, handleValidationErrors, getQuote);
router.delete("/:id", setLocale, verifyAuthToken, idParamValidation, handleValidationErrors, deleteQuote);
router.post("/", setLocale, verifyAuthToken, saveQuoteValidation, handleValidationErrors, saveQuote);

module.exports = router;