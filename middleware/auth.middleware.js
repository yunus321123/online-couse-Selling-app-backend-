import AppError from "../utils/error.utl.js";
import jwt from "jsonwebtoken";

const isLoggedIn = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        // Check if token exists
        if (!token) {
            return next(new AppError("Unauthenticated, please login again", 401));
        }

        // Verify the token
        const userDetails = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user details to the request object
        req.user = userDetails;

        next();
    } catch (error) {
        // Handle token verification errors
        return next(new AppError("Invalid or expired token, please login again", 401));
    }
};

export {
    isLoggedIn
};
