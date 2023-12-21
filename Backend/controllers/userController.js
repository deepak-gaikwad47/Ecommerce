import * as bcrypt from 'bcrypt';
import User from "../models/userModel.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from '../utils/errorHandler.js';
import sendToken from '../utils/jsonWebToken.js';
// import { log } from 'npm';


class Users {
    registerUser = catchAsyncErrors(async (req, res, next) => {
        const { name, email, password } = req.body;
        const hash = await bcrypt.hash(password, 10);
        const userData = {
            name, email, password: hash, avatar: {
                public_id: "this is sample ID",
                url: "https://i.ibb.co/DRST11n/1.webp"
            }
        }
        // console.log();
        // const user = User.findOne({ email })
        // console.log('user', user)
        const user = await User.create(userData);
        if (!user) return next(new ErrorHandler("User not found", 404));
        // console.log('errorr', error);
        // return next(new ErrorHandler(error, 400))
    })
    loginUser = catchAsyncErrors(async (req, res, next) => {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(new ErrorHandler("Please enter Email or Password", 400));
        }
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return next(new ErrorHandler("Invalid Email or Password", 400));
        }
        const isValidPassword = await bcrypt.compare(password, user['password']);
        if (!isValidPassword) {
            return next(new ErrorHandler("Invalid Email or Password", 400));
        }
        sendToken(user, 200, res)
    })
    logoutUser = (req, res, next) => {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true
        })
        res.status(200).json({
            success: true,
            message: "Logged out successfully"
        })
    }
    getUserDetail = catchAsyncErrors(async (req, res, next) => {
        const user = await User.findById(req.user.id);
        res.status(200).json({
            success: true,
            user
        })
    })
    updateProfile = catchAsyncErrors(async (req, res, next) => {
        const newUserData = {
            name: req.body.name,
            email: req.body.email
        }

        const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });
        res.status(200).json({
            success: true,
            user
        })
    })
    getAllUsers = catchAsyncErrors(async (req, res, next) => {
        const users = await User.find();
        res.status(200).json({
            success: true,
            users
        })
    })
    getSingleUser = catchAsyncErrors(async (req, res, next) => {
        const user = await User.findById(req.params.id);
        if (!user) {
            return next(new ErrorHandler(`User does not exists with ID:${req.params.id}`))
        }
        res.status(200).json({
            success: true,
            user
        })
    })
    updateRole = catchAsyncErrors(async (req, res, next) => {
        const newUserData = {
            name: req.body.name,
            email: req.body.email,
            role: req.body.role
        }

        const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });
        res.status(200).json({
            success: true,
            user
        })
    })
    deleteUser = catchAsyncErrors(async (req, res, next) => {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true
        })
        const user = User.findById(req.params.id);
        if (!user) {
            return next(new ErrorHandler('User does not exists'))
        }
        await user.remove();
        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        })
    })
}

export default new Users();