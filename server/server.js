import express from 'express';
import dotenv from "dotenv";
dotenv.config();

const server = express();

const port = process.env.PORT;

server.listen(port, () => {
    console.log(`listening to server ${port}`);
});