const createUserProfileTableQuery = `CREATE TABLE IF NOT EXISTS "user_profiles" (
    "id" SERIAL PRIMARY KEY,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "profile_image" VARCHAR(255),
    "user_id" INT NOT NULL,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP,
    FOREIGN KEY ("user_id") REFERENCES "users" ("id")
);`

module.exports = createUserProfileTableQuery