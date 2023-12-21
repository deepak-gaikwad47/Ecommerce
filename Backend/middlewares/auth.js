import mongoose from "mongoose";
import catchAsyncErrors from "./catchAsyncErrors.js";
import ErrorHandler from '../utils/errorHandler.js';
import jwt from 'jsonwebtoken';
import configuration from "../config/configuration.js";
import User from "../models/userModel.js";

const isAuthanticatedUser = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return next(new ErrorHandler("Please Login to access this resource", 401));
    }
    const decodedData = jwt.verify(token, configuration.JWTsecret);
    const { id } = decodedData;
    req.user = await User.findById(mongoose.Types.ObjectId(id));
    next();

});

const authorisedRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorHandler(
                    `Role: ${req.user.role} is not allowed to access this resouce `,
                    403
                )
            );
        }

        next();
    };
}

export { isAuthanticatedUser, authorisedRoles };


// SKIP -----> 2.52