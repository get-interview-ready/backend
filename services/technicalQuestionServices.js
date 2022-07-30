exports.INSERT_TECHNICAL_QUESTION = `INSERT INTO technical_questions 
    (id, question, tech_stack, user_id) VALUES 
    (UUID_TO_BIN(?), ?, ?, UUID_TO_BIN(?));`;

exports.DELETE_TECHNICAL_QUESTION_BY_ID = `DELETE FROM technical_questions
    WHERE id = UUID_TO_BIN(?);`;

exports.SELECT_ALL_TECHNICAL_QUESTIONS_BY_UID = `SELECT BIN_TO_UUID(id) AS id,
    question, tech_stack, updated_at
    FROM technical_questions
    WHERE user_id = UUID_TO_BIN(?);`;

exports.SELECT_TECHNICAL_QUESTION_BY_ID = `SELECT BIN_TO_UUID(id) AS id,
    question, solution, tech_stack, solution_url, 
    solution_type,
    BIN_TO_UUID(user_id) AS user_id, updated_at
    FROM technical_questions
    WHERE id = UUID_TO_BIN(?);`;

exports.UPDATE_SOLUTION_BY_ID = `UPDATE technical_questions
    SET solution = ? WHERE id = UUID_TO_BIN(?);`;

exports.UPDATE_SOLUTION_URL_BY_ID = `UPDATE technical_questions
    SET solution_url = ? WHERE id = UUID_TO_BIN(?);`;
