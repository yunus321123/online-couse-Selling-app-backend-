import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connectToDb from "./config/db.config.js";
import router from "./routes/user.route.js";
import errorMiddleware from "./middleware/error.middleware.js";

connectToDb()

// Load environment variables from .env file
dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true // Ensure the 'credentials' property is correct
}));



// Routes
// app.all('*', (req, res) => {
//     res.status(404).send("OOPS! page not found");
// });

app.use('/api/v1/user',router)

app.use(errorMiddleware)

export default app; // Use 'export default' for ES Modules
