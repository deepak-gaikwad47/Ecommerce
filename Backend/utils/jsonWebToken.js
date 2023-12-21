import jwt from 'jsonwebtoken';
import configuration from "../config/configuration.js";

// create token and saving in cookie
const sendToken = (user, statusCode, res) => {
    const token = jwt.sign({ id: user._id }, configuration.JWTsecret, { expiresIn: '5d' });
    if (token) {
        const options = {
            expires: new Date(
                Date.now() + configuration.cookie_expire * 24 * 60 * 60 * 1000
            ),
            httpOnly: true
        }
        res.status(statusCode).cookie('token', token, options).json({
            success: true,
            user,
            token
        })
    }
}

export default sendToken;