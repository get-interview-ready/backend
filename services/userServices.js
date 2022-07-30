exports.CREATE_USER = `INSERT INTO users 
    (id, full_name, email, password) 
    VALUES (UUID_TO_BIN(?), ?, ?, ?);`;

exports.SELECT_USER_BY_EMAIL = `SELECT BIN_TO_UUID(id) AS id, 
    full_name, email, password, created_at 
    FROM users where email = ?;`;

