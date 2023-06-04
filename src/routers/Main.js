const express = require('express');
const router = express.Router();
const { getRandomQuote, getQuotesByTag } = require("../controllers/Controller.js");
const { setLocale, handleValidationErrors } = require("../utils.js");
const { tagParamValidation } = require('../valids.js');


router.get("/", (_, res) => {
    res.status(200).json({
        message: "The QUTS-API service. It's very simple and very useful!"
    });
});
router.get("/random", setLocale, getRandomQuote);
router.get("/tags/:tag", setLocale, tagParamValidation, handleValidationErrors, getQuotesByTag);

module.exports = router;