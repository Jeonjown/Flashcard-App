import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import deckRoutes from './routes/deckRoutes.js';
import flashcardRoutes from './routes/flashcardRoutes.js';

dotenv.config();

const server = express();

// CORS configuration
server.use(cors({
    origin: ['http://localhost:5173', 'https://quizme-frontend.onrender.com'],
    credentials: true,
}));

server.use(cookieParser());
server.use(express.json());

// Connect to the database
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
// Middleware for routes
server.use('/users', userRoutes);
server.use('/decks', deckRoutes);
server.use('/decks', flashcardRoutes);