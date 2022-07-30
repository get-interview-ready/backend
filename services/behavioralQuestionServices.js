exports.INSERT_BEHAVIORAL_QUESTION = `INSERT INTO behavioral_questions 
    (id, questionId, question, answer, user_id) VALUES 
    (UUID_TO_BIN(?), ?, ?, ?, UUID_TO_BIN(?));`;

exports.DELETE_BEHAVIORAL_QUESTION_BY_ID = `DELETE FROM behavioral_questions 
    WHERE id = UUID_TO_BIN(?);`;

exports.SELECT_ALL_BEHAVIORAL_QUESTIONS_BY_UID = `SELECT BIN_TO_UUID(id) AS id, 
    questionId, question, updated_at 
    FROM behavioral_questions 
    WHERE user_id = UUID_TO_BIN(?);`;

exports.SELECT_BEHAVIORAL_QUESTION_BY_ID = `SELECT BIN_TO_UUID(id) AS id, 
    questionId, question, answer,
    BIN_TO_UUID(user_id) AS user_id, updated_at
    FROM behavioral_questions 
    WHERE id = UUID_TO_BIN(?);`;

exports.UPDATE_ANSWER_BY_ID = `UPDATE behavioral_questions 
    SET answer = ? WHERE id = UUID_TO_BIN(?);`;
