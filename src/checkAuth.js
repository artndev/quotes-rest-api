import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";


export const verifyAuthToken = (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if (token) {
        try {
            jwt.verify(token, process.env.SECRET_KEY);

            next();
        } 
        catch (err) {
            return res.status(403).json({
                message: "Нет доступа."
            });
        }
    } 
    else {
        return res.status(403).json({
            message: "Нет доступа."
        });
    }
}

export const signAuthToken = (data = {}) => {
    return jwt.sign(
        data,
        process.env.SECRET_KEY,
        {
            expiresIn: "30d"
        }
    )
}
