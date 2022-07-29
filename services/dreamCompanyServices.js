exports.INSERT_DREAM_COMPANY = `INSERT INTO dream_companies 
    (id, name, user_id) VALUES 
    (UUID_TO_BIN(?), ?, UUID_TO_BIN(?));`;

// redundant for now
exports.SELECT_DREAM_COMPANY_BY_NAME_AND_UID = `SELECT BIN_TO_UUID(id) AS id, 
    name, updated_at, md_text, referral_msg,
    BIN_TO_UUID(user_id) AS user_id, created_at
    FROM dream_companies 
    WHERE user_id = UUID_TO_BIN(?) AND name = ?;`;

exports.DELETE_DREAM_COMPANY_BY_ID = `DELETE FROM dream_companies 
    WHERE id = UUID_TO_BIN(?);`;

exports.SELECT_ALL_DREAM_COMPANIES_BY_UID = `SELECT BIN_TO_UUID(id) AS id, 
    name, updated_at, md_text, referral_msg,
    BIN_TO_UUID(user_id) AS user_id, created_at, 
    updated_at FROM dream_companies 
    WHERE user_id = UUID_TO_BIN(?);`;

exports.SELECT_DREAM_COMPANY_BY_ID = `SELECT BIN_TO_UUID(id) AS id, 
    name, updated_at, md_text, referral_msg,
    BIN_TO_UUID(user_id) AS user_id, created_at
    FROM dream_companies 
    WHERE id = UUID_TO_BIN(?);`;

exports.UPDATE_MD_TEXT_BY_ID = `UPDATE dream_companies 
    SET md_text = ? WHERE id = UUID_TO_BIN(?);`;

exports.UPDATE_REFERRAL_MSG_BY_ID = `UPDATE dream_companies 
    SET referral_msg = ? WHERE id = UUID_TO_BIN(?);`;

exports.INSERT_REFERRER = `INSERT INTO dream_company_referrals 
    (id, name, link, contacted, user_id, company_id) VALUES 
    (UUID_TO_BIN(?), ?, ?, 0, UUID_TO_BIN(?), UUID_TO_BIN(?));`;

exports.DELETE_REFERRER = `DELETE FROM dream_company_referrals 
    WHERE id = UUID_TO_BIN(?);`;
