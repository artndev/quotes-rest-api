require("dotenv").config();
const i18n = require("i18n");
const jwt = require("jsonwebtoken");


module.exports = {
    verifyAuthToken: (req, res, next) => {
        const authorization = req.headers.authorization || '';
        const token = authorization.replace(/Bearer\s?/, '');
    
        try {
            jwt.verify(token, process.env.SECRET_KEY);

            next();
        } 
        catch (err) {
            return res.status(403).json({
                message: i18n.__("Нет доступа.")
            });
        }
    },
    signAuthToken: (data = {}) => {
        return jwt.sign(
            data,
            process.env.SECRET_KEY,
            {
                expiresIn: "30d"
            }
        )
    }
}