import express from 'express';
import { createDeck, deleteDeck, editDeck, getAllDecks, getDeckById, getDecksByUser } from '../controller/deckController.js';
import { requireAuth } from '../middleware/requireAuth.js';
const router = express.Router();

router.use(requireAuth);


// create deck
router.post('/create', createDeck);

// get deck by Id
router.get('/:deckId', getDeckById);

// get all decks by user
router.get('/', getDecksByUser);

// get all decks globally
router.get('/all', getAllDecks);

// edit deck
router.put('/:deckId', editDeck);

// delete deck 
router.delete('/:deckId', deleteDeck);


export default router;