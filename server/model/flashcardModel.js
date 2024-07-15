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
});


const Flashcard = mongoose.model('Flashcard', flashcardSchema);

export { flashcardSchema, Flashcard };