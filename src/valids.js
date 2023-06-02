const { body, param } = require("express-validator");


module.exports = {
    saveQuoteValidation: [
        body("quotes", "Invalid array (QUOTES) data")
            .isArray()
            .notEmpty(),
        body("quotes.*.text", "Invalid key (TEXT) value")
            .isString()
            .notEmpty()
            .isLength({ min: 5, max: 300 }),
        body("quotes.*.author", "Invalid key (AUTHOR) value")
            .isString()
            .notEmpty()
            .isLength({ min: 3 })
            .optional(),
        body("quotes.*.tags", "Invalid key (TAGS) value")
            .isArray()
            .notEmpty()
            .optional()
            .custom((tags) => {
                return tags.every((tag) => typeof tag === "string")
            })
    ],
    idParamValidation: [
        param("id")
            .isString()
            .notEmpty()
    ],
    tagParamValidation: [
        param("tag")
            .isString()
            .notEmpty()
    ],
}

