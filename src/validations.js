const { body, param } = require("express-validator");


module.exports = {
    saveQuoteValidation: [
        body("text")
            .isString()
            .notEmpty()
            .isLength({ min: 10, max: 100 }),
        body("author")
            .isString()
            .notEmpty()
            .isLength({ min: 2, max: 20 })
            .optional()
    ],
    idParamValidation: [
        param("id").isString().notEmpty()
    ]
}
