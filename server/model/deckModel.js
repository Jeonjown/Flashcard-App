import mongoose from "mongoose";
import { Flashcard } from "./flashcardmodel.js";

const deckSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    flashcards: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Flashcard'
    }]
}, { timestamps: true });

const Deck = mongoose.model('Deck', deckSchema);

export default Deck; 
