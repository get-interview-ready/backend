exports.INSERT_PROJECT = `INSERT INTO projects 
    (id, name, tagline, tech_stack, user_id) VALUES 
    (UUID_TO_BIN(?), ?, ?, ?, UUID_TO_BIN(?));`;

exports.DELETE_PROJECT_BY_ID = `DELETE FROM projects
    WHERE id = UUID_TO_BIN(?);`;

exports.SELECT_ALL_PROJECTS_BY_UID = `SELECT BIN_TO_UUID(id) AS id,
    name, tagline, tech_stack, updated_at
    FROM projects
    WHERE user_id = UUID_TO_BIN(?);`;

exports.SELECT_PROJECT_BY_ID = `SELECT BIN_TO_UUID(id) AS id,
    name, tagline, tech_stack, answers,
    BIN_TO_UUID(user_id) AS user_id, updated_at
    FROM projects
    WHERE id = UUID_TO_BIN(?);`;

exports.UPDATE_ANSWERS_BY_ID = `UPDATE projects
    SET answers = ? WHERE id = UUID_TO_BIN(?);`;
