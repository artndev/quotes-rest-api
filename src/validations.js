import { body, param } from "express-validator";


export const saveQuoteValidation = [
    body("text")
        .isString()
        .notEmpty()
        .isLength({ min: 10, max: 100 }),
    body("author")
        .isString()
        .notEmpty()
        .isLength({ min: 2, max: 20 })
        .optional()
];
export const idParamValidation = [
    param("id").isString().notEmpty()
];