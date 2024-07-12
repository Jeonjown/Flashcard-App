import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config();
const server = express();

//connecting to database
const dbConnect = async () => {
    await mongoose.connect(process.env.DB_URI);
    try {
        console.log('connected to DB');

        // server
        server.listen(process.env.PORT, () => {
            console.log(`listening to server ${process.env.PORT}`);
        });
    } catch (error) {
        console.log('Error at dbConnect ::', error);
    }
};

dbConnect();

