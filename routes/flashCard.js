const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  createDeck,
  deleteDeck,
  getAllDecks,
  createFlashCard,
  deleteFlashCard,
  getAllFlashCards,
} = require("../controllers/flashCardController");

router.route("/createDeck").post(auth, createDeck);
router.route("/deleteDeck").delete(auth, deleteDeck);
router.route("/getAllDecks/:id").get(auth, getAllDecks);
router.route("/createFlashCard").post(auth, createFlashCard);
router.route("/deleteFlashCard").delete(auth, deleteFlashCard);
router.route("/getAllFlashCards").get(auth, getAllFlashCards);

module.exports = router;
