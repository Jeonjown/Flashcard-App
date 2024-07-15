import express from 'express';
import { createDeck, deleteDeck, editDeck, getAllDecks, getDecksByUser } from '../controller/deckController.js';
import { requireAuth } from '../middleware/requireAuth.js';
const router = express.Router();

router.use(requireAuth);


// create deck
router.post('/create', createDeck);

// get all decks by user
router.get('/', getDecksByUser);

// get all decks globally
router.get('/all', getAllDecks);

// edit deck
router.put('/edit/:deckID', editDeck);

// delete deck 
router.delete('/delete/:deckID', deleteDeck);


export default router;