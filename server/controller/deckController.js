import Deck from "../model/deckModel.js";


// get all decks
export const getDecks = async (req, res) => {
    try {
        const decks = await Deck.find({});

        res.status(200).json({ decks });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

// get specific deck
// edit deck
// delete deck 
