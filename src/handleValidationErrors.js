const i18n = require("i18n");
const { validationResult } = require('express-validator');


module.exports = (req, res, next) => {
    i18n.setLocale(req.query.lang || 'en')
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: i18n.__("Произошла ошибка валидации."),
            errors: errors.array()
        });
    }

    next();
}