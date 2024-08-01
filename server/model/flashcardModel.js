import mongoose from "mongoose";

const flashcardSchema = new mongoose.Schema({
    term: {
        type: String,
    },
    definition: {
        type: String,
    },
    author: {
        type: String,
    },
    learned: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });


const Flashcard = mongoose.model('Flashcard', flashcardSchema);

export { Flashcard };