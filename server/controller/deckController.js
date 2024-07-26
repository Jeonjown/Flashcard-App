import Deck from "../model/deckModel.js";


// create decks
export const createDeck = async (req, res) => {
    const user_id = await req.user.id;
    console.log(user_id);
    try {
        const newDeck = await Deck.create({
            title: req.body.title,
            author: user_id,
            flashcards: req.body.flashcards || []
        });

        res.status(200).json({ newDeck });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }

};

// get all decks globally
export const getAllDecks = async (req, res) => {
    try {
        const decks = await Deck.find();
        res.status(200).json(decks); // Send the response once
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// get all decks by user
export const getDecksByUser = async (req, res) => {
    console.log("from user: ", req.user.id);
    const user_id = await req.user.id;

    try {
        const decks = await Deck.find({ author: user_id }).sort({ createdAt: -1 });
        res.status(200).json({ decks });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// edit deck
export const editDeck = async (req, res) => {
    const deckID = await req.params.deckID;
    try {
        const updatedDeck = await Deck.findByIdAndUpdate(deckID, {
            title: req.body.title,
        }, { new: true });

        if (!updatedDeck) {
            return res.status(404).json({ error: 'Deck not found' });
        }

        res.status(200).json({ updatedDeck });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// delete deck 
export const deleteDeck = async (req, res) => {
    const deckID = await req.params.deckID;
    try {
        const deletedDeck = await Deck.findByIdAndDelete(deckID);

        if (!deletedDeck) {
            return res.status(404).json({ error: 'Deck not found' });
        }
        res.status(200).json({ message: 'Deck deleted successfully', deletedDeck });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};