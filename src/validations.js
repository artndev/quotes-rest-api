import { body } from "express-validator";


export const quoteValidation = [
    body("text")
        .isString()
        .isLength({ min: 10, max: 100 }),
    body("author")
        .isString()
        .optional()
];