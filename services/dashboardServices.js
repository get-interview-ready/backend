exports.GET_STATS = `SELECT 
    (SELECT COUNT(*) FROM behavioral_questions WHERE user_id = UUID_TO_BIN(?))`

// exports.SELECT_ALL_DECKS_BY_UID = `SELECT BIN_TO_UUID(id) AS id, name, 
//     BIN_TO_UUID(user_id) AS user_id, updated_at,
//     (SELECT COUNT(*) FROM flash_cards WHERE deck_id = flash_card_decks.id) 
//     AS cards_count FROM flash_card_decks 
//     WHERE flash_card_decks.user_id = UUID_TO_BIN(?);`;