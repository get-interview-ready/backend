// users table
exports.dropUsersTableSQL = "DROP TABLE IF EXISTS users;";

exports.createUsersTableSQL = `CREATE TABLE users (
    id BINARY(16) PRIMARY KEY,
    full_name TEXT NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  );`;

// behavioral_questions table
exports.dropBehavioralQuestionsTableSQL =
  "DROP TABLE IF EXISTS behavioral_questions";

exports.createBehavioralQuestionsTableSQL = `CREATE TABLE behavioral_questions (
    id BINARY(16) PRIMARY KEY,
    questionId TEXT,
    question TEXT,
    answer TEXT,
    user_id BINARY(16),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  );`;

// flash_card_folders table
exports.dropFlashCardFoldersTableSQL =
  "DROP TABLE IF EXISTS flash_card_folders;";

exports.createFlashCardFoldersTableSQL = `CREATE TABLE flash_card_folders (
    id BINARY(16) PRIMARY KEY,
    name TEXT,
    user_id BINARY(16),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  );`;

// flash_cards table
exports.dropFlashCardsTableSQL = "DROP TABLE IF EXISTS flash_cards;";

exports.createFlashCardsTableSQL = `CREATE TABLE flash_cards (
    id BINARY(16) PRIMARY KEY,
    question TEXT,
    answer TEXT,
    category_id BINARY(16),
    user_id BINARY(16),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  );`;

// projects table
exports.dropProjectsTableSQL = "DROP TABLE IF EXISTS projects;";

exports.createProjectsTableSQL = `CREATE TABLE projects (
    id BINARY(16) PRIMARY KEY,
    name TEXT,
    tagline TEXT,
    tech_stack TEXT,
    answers TEXT,
    user_id BINARY(16),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  );`;

// project_questions table
exports.dropProjectQuestionsTableSQL =
  "DROP TABLE IF EXISTS project_questions;";

exports.createProjectQuestionsTableSQL = `CREATE TABLE project_questions (
    id BINARY(16) PRIMARY KEY,
    question TEXT,
    answer TEXT,
    project_id BINARY(16),
    user_id BINARY(16),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  );`;

// dream_companies table
exports.dropDreamCompaniesTableSQL =
  "DROP TABLE IF EXISTS dream_companies;";

exports.createDreamCompaniesTableSQL = `CREATE TABLE dream_companies (
    id BINARY(16) PRIMARY KEY,
    name VARCHAR(255),
    md_text TEXT,
    referral_msg TEXT,
    user_id BINARY(16),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  );`;

exports.addUniqueCompanyConstraint = `ALTER TABLE dream_companies ADD CONSTRAINT uq_company UNIQUE(name, user_id);`

// dream_company_refferals table
exports.dropDreamCompanyReferralsTableSQL =
  "DROP TABLE IF EXISTS dream_company_referrals;";

exports.createDreamCompanyReferralsTableSQL = `CREATE TABLE dream_company_referrals (
    id BINARY(16) PRIMARY KEY,
    name TEXT,
    link TEXT,
    contacted TINYINT,
    user_id BINARY(16),
    company_id BINARY(16),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  );`;

// // dream_comapny_notes table
// exports.dropDreamCompanyNotesTableSQL =
//   "DROP TABLE IF EXISTS dream_company_notes;";

// exports.createDreamCompanyNotesTableSQL = `CREATE TABLE dream_company_notes (
//     id BINARY(16) PRIMARY KEY,
//     note TEXT,
//     user_id BINARY(16),
//     company_id BINARY(16),
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
//   );`;

// technical_questions table
exports.dropTechnicalQuestionsTableSQL =
  "DROP TABLE IF EXISTS technical_questions;";

exports.createTechnicalQuestionsTableSQL = `CREATE TABLE technical_questions (
    id BINARY(16) PRIMARY KEY,
    question TEXT,
    answer TEXT,
    solution_url TEXT,
    solution_type TEXT,
    user_id BINARY(16),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  );`;