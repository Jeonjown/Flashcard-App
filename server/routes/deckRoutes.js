import express from 'express';
import { getDecks } from '../controller/deckController.js';
import { requireAuth } from '../middleware/requireAuth.js';
const router = express.Router();

router.use(requireAuth);

// get all decks
router.get('/', getDecks);

// get specific decks





export default router;