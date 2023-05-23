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

// console.log(signAuthToken({data: "0)910k_+=fe2k3r(*3,.;[ap295892KKl/eJ..Fu4-qw43k3!(*#8*$@NNNay3gr"}))