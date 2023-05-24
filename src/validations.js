const { body, param } = require("express-validator");


module.exports = {
    saveQuoteValidation: [
        body("quotes")
            .isArray()
            .notEmpty(),
        body("quotes.*.author")
            .isString()
            .notEmpty()
            .isLength({ min: 2, max: 20 })
            .optional(),
        body("quotes.*.text")
            .isString()
            .notEmpty()
            .isLength({ min: 10, max: 100 }),
    ],
    idParamValidation: [
        param("id").isString().notEmpty()
    ]
}
