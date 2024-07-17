import express from 'express';
import { createFlashcard, deleteFlashcard, editFlashcard, getFlashcards } from '../controller/flashcardController.js';

const router = express.Router();

//  POST route for flashcards
router.post('/:deckId/flashcards/create', createFlashcard);

//  GET route for flashcards
router.get('/:deckId/flashcards/', getFlashcards);

//  PUT route for flashcards
router.put('/:deckId/flashcards/:flashcardId', editFlashcard);

//  DELETE route for flashcards
router.delete('/:deckId/flashcards/:flashcardId', deleteFlashcard);





export default router;
