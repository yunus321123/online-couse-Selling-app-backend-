import dotenv from 'dotenv';
import app from './app.js';

// Load environment variables from .env file
dotenv.config();

const PORT = process.env.PORT || 6859;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
