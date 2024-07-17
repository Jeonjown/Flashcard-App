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
}, { timestamps: true });


const Flashcard = mongoose.model('Flashcard', flashcardSchema);

export { Flashcard };