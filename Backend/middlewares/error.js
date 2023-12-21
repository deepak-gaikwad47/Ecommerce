import ErrorHandler from "../utils/errorHandler.js";

export default (err, req, res, next) => {
    const errStatus = err && err.status || 500;
    const errMessage = err && err.message || "Internal Server Error";
    const errName = err && err.name || "Error";
    if (errName === 'CastError') {
        const message = `Resource not found, Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }
    return res && res.status(errStatus).json({
        success: false,
        message: errMessage
    })
}
