import mongoose from "mongoose";
import { flashcardSchema } from "./flashcardmodel";

const deckSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    flashcards: [flashcardSchema]


}, { timestamps: true });


const Deck = mongoose.model('Deck', deckSchema);

export default Deck;