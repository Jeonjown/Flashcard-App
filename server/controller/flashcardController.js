import { Flashcard } from "../model/flashcardmodel.js";
import Deck from "../model/deckModel.js";


// create flashcards
export const createFlashcard = async (req, res) => {
    const deckId = req.params.deckId;

    try {
        // Find the deck with the specified deckId and include the flashcards
        let foundDeck = await Deck.findById(deckId).populate('flashcards');

        // Check if the deck exists
        if (!foundDeck) {
            return res.status(404).json({ error: 'No deck found' });
        }

        const user_id = req.user._id;

        // Create the new flashcard
        const flashcard = await Flashcard.create({
            term: req.body.term,
            definition: req.body.definition,
            author: user_id
        });

        // Add the new flashcard to the deck's flashcards array
        foundDeck.flashcards.push(flashcard);
        foundDeck = await foundDeck.save();

        // Return the updated list of flashcards
        res.status(201).json({ flashcard });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};



// get flashcards
export const getFlashcards = async (req, res) => {

    try {
        const deckId = req.params.deckId;
        const foundDeck = await Deck.findById(deckId).populate("flashcards");

        foundDeck.flashcards.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        if (!foundDeck) { throw new Error('no deck found'); }

        res.status(200).json(foundDeck);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// update flashcard
export const editFlashcard = async (req, res) => {
    const updateData = req.body;
    const deckId = req.params.deckId;
    const flashcardId = req.params.flashcardId;

    try {
        // search deckId inside db
        const foundDeck = await Deck.findById(deckId);
        if (!foundDeck) { return res.status(404).json({ msg: "deck not found" }); }

        // search flashcardId inside db
        const updatedFlashcard = await Flashcard.findByIdAndUpdate(flashcardId, updateData, { new: true });
        if (!updatedFlashcard) { return res.status(404).json({ msg: "flashcard not found" }); }


        res.status(200).json({ foundDeck, updatedFlashcard });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// delete flashcard 
export const deleteFlashcard = async (req, res) => {
    const deckId = req.params.deckId;
    const flashcardId = req.params.flashcardId;

    try {
        // search deckId inside db
        const foundDeck = await Deck.findById(deckId);
        if (!foundDeck) { return res.status(404).json({ msg: "deck not found" }); }

        // search flashcardId inside db
        const deletedFlashcard = await Flashcard.findByIdAndDelete(flashcardId);
        if (!deletedFlashcard) { return res.status(404).json({ msg: "flashcard not found" }); }

        res.status(200).json({ foundDeck, deletedFlashcard });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

};
