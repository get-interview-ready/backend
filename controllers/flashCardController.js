const connection = require("../config/database");
const internalServerError = require("../utils/internalServerError");
const { v4: uuidv4 } = require("uuid");
const {
  INSERT_DECK,
  DELETE_DECK,
  SELECT_ALL_DECKS_BY_UID,
  INSERT_FLASH_CARD,
  DELETE_FLASH_CARD,
  SELECT_ALL_FLASH_CARDS,
} = require("../services/flashCardServices");

exports.createDeck = (req, res) => {
  const { name, user_id } = req.body;
  if (!name || !user_id) {
    return res.status(400).json({
      success: false,
      message: "Send name of flashcard deck and user ID",
    });
  }
  try {
    const id = uuidv4();
    const deck = { id, name, user_id };
    connection.query(INSERT_DECK, [id, name, user_id], (err, results) => {
      if (err) {
        return internalServerError(res);
      }
      return res.status(200).json({
        success: true,
        message: "Deck created successfully",
        deck,
      });
    });
  } catch (err) {
    return internalServerError(res);
  }
};

exports.deleteDeck = (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Send id of deck to delete",
    });
  }
  try {
    connection.query(DELETE_DECK, [id], (err, results) => {
      if (err) {
        return internalServerError(res);
      }
      return res.status(200).json({
        success: true,
        message: "Deck successfully deleted",
      });
    });
  } catch (err) {
    return internalServerError(res);
  }
};

exports.getAllDecks = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Send user ID to fetch all decks",
    });
  }

  try {
    connection.query(SELECT_ALL_DECKS_BY_UID, [id], (err, results) => {
      if (err) {
        console.log(err);
        return internalServerError(res);
      }
      return res.status(200).json({
        success: true,
        message: "Decks fetched successfully",
        decks: results,
      });
    });
  } catch (err) {
    return internalServerError(res);
  }
};

exports.createFlashCard = (req, res) => {
  const { question, answer, deck_id, user_id } = req.body;

  if (!question || !answer || !deck_id || !user_id) {
    return res.status(400).json({
      success: false,
      message: "Send question, answer, deck ID and user ID",
    });
  }
  try {
    const id = uuidv4();
    const flashCard = { id, question, answer, deck_id, user_id };
    connection.query(
      INSERT_FLASH_CARD,
      [id, question, answer, deck_id, user_id],
      (err, results) => {
        if (err) {
          return internalServerError(res);
        }
        return res.status(200).json({
          success: true,
          message: "Flash card successfully created",
          flashCard,
        });
      }
    );
  } catch (err) {
    return internalServerError(res);
  }
};

exports.deleteFlashCard = (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Send flash card ID to delete",
    });
  }

  try {
    connection.query(DELETE_FLASH_CARD, [id], (err, results) => {
      if (err) {
        return internalServerError(res);
      }
      return res.status(200).json({
        success: true,
        message: "Flash card successfully deleted",
      });
    });
  } catch (err) {
    return internalServerError(res);
  }
};

exports.getAllFlashCards = (req, res) => {
  const { user_id, deck_id } = req.query;

  if (!user_id || !deck_id) {
    return res.status(400).json({
      success: false,
      message: "Send user ID and deck ID",
    });
  }
  try {
    connection.query(
      SELECT_ALL_FLASH_CARDS,
      [deck_id, user_id],
      (err, results) => {
        if (err) {
          return internalServerError(res);
        }
        return res.status(200).json({
          success: true,
          message: "Flash cards fetched successfully",
          flashCards: results,
        });
      }
    );
  } catch (err) {
    return internalServerError(res);
  }
};
