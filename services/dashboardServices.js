exports.GET_STATS = `SELECT
    (SELECT COUNT(*) FROM behavioral_questions
    WHERE user_id = UUID_TO_BIN(?)) AS behavioral_questions,
    (SELECT COUNT(*) FROM dream_companies
    WHERE user_id = UUID_TO_BIN(?)) AS dream_companies,
    (SELECT COUNT(*) FROM projects
    WHERE user_id = UUID_TO_BIN(?)) AS projects,
    (SELECT COUNT(*) FROM technical_questions
    WHERE user_id = UUID_TO_BIN(?)) AS technical_questions;`;

exports.GET_TEST_STATS = `SELECT num_of_questions, score, created_at FROM flash_card_tests 
    WHERE user_id = UUID_TO_BIN(?) 
    AND created_at > current_date - INTERVAL 7 DAY ORDER BY created_at ASC;`;
