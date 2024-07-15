import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import deckRoutes from './routes/deckRoutes.js';
import dotenv from "dotenv";
dotenv.config();

const server = express();

server.use(express.json());

// Middleware for routes
server.use('/quizme/users', userRoutes);
server.use('/quizme/decks', deckRoutes);

// Connecting to database
const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log('Connected to DB');

        // Start server
        server.listen(process.env.PORT, () => {
            console.log(`Server listening on port ${process.env.PORT}`);
        });
    } catch (error) {
        console.error('Error connecting to DB:', error);
    }
};

dbConnect();
