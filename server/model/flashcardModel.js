import mongoose from "mongoose";

const flashcardSchema = new mongoose.Schema({
    term: {
        type: String,
        required: true
    },
    definition: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
});


const Flashcard = mongoose.model('Flashcard', flashcardSchema);

export { flashcardSchema, Flashcard };