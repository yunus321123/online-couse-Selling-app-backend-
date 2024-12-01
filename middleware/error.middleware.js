const errorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Something went wrong";

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
        // Only include the stack in non-production environments for debugging
        stack: process.env.NODE_ENV !== 'production' ? err.stack : undefined,
    });
};

export default errorMiddleware;
