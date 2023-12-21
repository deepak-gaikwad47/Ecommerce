class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.message = message
        Error(this, this.constructor)
    }
}

export default ErrorHandler;
