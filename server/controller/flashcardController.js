import { Flashcard } from "../model/flashcardModel.js";
import Deck from "../model/deckModel.js";


// create flashcards
export const createFlashcard = async (req, res) => {
    const deckId = req.params.deckId;

    try {
        let foundDeck = await Deck.findById(deckId).populate('flashcards');

        if (!foundDeck) {
            return res.status(404).json({ error: 'No deck found' });
        }

        const user_id = req.user._id;

        const flashcard = await Flashcard.create({
            term: req.body.term,
            definition: req.body.definition,
            author: user_id
        });

        foundDeck.flashcards.push(flashcard);
        foundDeck = await foundDeck.save();

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

        if (!foundDeck) { throw new Error('No deck found'); }

        foundDeck.flashcards.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

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
        const foundDeck = await Deck.findById(deckId);
        if (!foundDeck) { return res.status(404).json({ msg: "Deck not found" }); }

        const updatedFlashcard = await Flashcard.findByIdAndUpdate(flashcardId, updateData, { new: true });
        if (!updatedFlashcard) { return res.status(404).json({ msg: "Flashcard not found" }); }

        res.status(200).json({ foundDeck, updatedFlashcard });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// delete flashcard 
export const deleteFlashcard = async (req, res) => {
    const { deckId, flashcardId } = req.params;

    try {
        const deletedFlashcard = await Flashcard.findByIdAndDelete(flashcardId);
        if (!deletedFlashcard) {
            return res.status(404).json({ msg: "Flashcard not found" });
        }

        await Deck.findByIdAndUpdate(deckId, {
            $pull: { flashcards: flashcardId }
        });

        res.status(200).json({ msg: "Flashcard deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};