const { body, param } = require("express-validator");


module.exports = {
    saveQuoteValidation: [
        body("quotes")
            .isArray()
            .notEmpty(),
        body("quotes.*.author")
            .isString()
            .notEmpty()
            .isLength({ min: 3 })
            .optional(),
        body("quotes.*.text")
            .isString()
            .notEmpty()
            .isLength({ min: 10, max: 100 }),
    ],
    idParamValidation: [
        param("id")
            .isString()
            .notEmpty()
            .isLength({ min: 3 })
    ],
    tagParamValidation: [
        param("tag")
            .isString()
            .notEmpty()
            .isLength({ min: 3 })
    ],
}

