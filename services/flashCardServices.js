exports.INSERT_DECK = `INSERT INTO flash_card_decks
    (id, name, user_id) VALUES
    (UUID_TO_BIN(?), ?, UUID_TO_BIN(?));`;

exports.DELETE_DECK = `DELETE FROM flash_card_decks
    WHERE id = UUID_TO_BIN(?);`;

exports.SELECT_ALL_DECKS_BY_UID = `SELECT BIN_TO_UUID(id) AS id, name, 
    BIN_TO_UUID(user_id) AS user_id, updated_at,
    (SELECT COUNT(*) FROM flash_cards WHERE deck_id = flash_card_decks.id) 
    AS cards_count FROM flash_card_decks 
    WHERE flash_card_decks.user_id = UUID_TO_BIN(?);`;

exports.INSERT_FLASH_CARD = `INSERT INTO flash_cards
    (id, question, answer, deck_id, user_id) VALUES
    (UUID_TO_BIN(?), ?, ?, UUID_TO_BIN(?), UUID_TO_BIN(?));`;

exports.DELETE_FLASH_CARD = `DELETE FROM flash_cards
    WHERE id = UUID_TO_BIN(?);`;

exports.SELECT_ALL_FLASH_CARDS = `SELECT BIN_TO_UUID(id) AS id,
    question, answer, BIN_TO_UUID(deck_id) AS deck_id, 
    BIN_TO_UUID(user_id) AS user_id, updated_at
    FROM flash_cards WHERE deck_id = UUID_TO_BIN(?) AND
    user_id = UUID_TO_BIN(?)`;

exports.INSERT_SCORE = `INSERT INTO flash_card_tests
    (id, name, deck_id, user_id, num_of_questions, score) VALUES
    (UUID_TO_BIN(?), ?, UUID_TO_BIN(?), UUID_TO_BIN(?), ?, ?);`;
