const i18n = require("i18n");


module.exports = {
    setLocale: (req, _, next) => {
        i18n.setLocale(req.query.lang || 'en');
    
        next();
    },
    getRandomArbitrary: (min, max) => {
        return Math.random() * (max - min) + min;
    }
}
