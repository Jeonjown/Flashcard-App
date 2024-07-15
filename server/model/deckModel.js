import mongoose from "mongoose";
import { flashcardSchema } from "./flashcardmodel.js"; // Ensure the correct relative path and .js extension

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

export default Deck; // Export the Deck model as default
