let createUserMoneyTableQuery = `CREATE TABLE IF NOT EXISTS "user_money" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT NOT NULL,
    "balance" DECIMAL(10, 2) NOT NULL,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP,
    FOREIGN KEY ("user_id") REFERENCES "users" ("id")
);`