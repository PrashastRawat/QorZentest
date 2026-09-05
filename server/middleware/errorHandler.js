const errorMiddleware = (err, req, res, next) => {
    try {
        let error = { ...err };
        error.message = err.message;

        // A 401 here almost always just means "no one is logged in yet" —
        // GET /api/auth/me gets called on every page load to check for a
        // session, so this fires constantly and isn't a real error.
        // Only dump the noisy stack trace for genuine server-side failures.
        if (!err.statusCode || err.statusCode >= 500) {
            console.error(err);
        }

        // Mongoose bad ObjectId
        if (err.name === 'CastError') {
            const message = `Resource not found`;
            error = new Error(message);
            error.statusCode = 404;
        }

        // Mongoose duplicate key
        if (err.code === 11000) {
            const message = `Duplicate field value entered`;
            error = new Error(message);
            error.statusCode = 400;
        }

        // Mongoose validation error
        if (err.name === 'ValidationError') {
            const message = Object.values(err.errors).map(val => val.message);
            error = new Error(message.join(', '));
            error.statusCode = 400;
        }

        res.status(error.statusCode || 500).json({
            success: false,
            error: error.message || 'Server Error'
        });
    } catch (err) {
        next(err);
    }
};

export default errorMiddleware;