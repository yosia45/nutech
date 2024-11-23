let createUserTransactionTableQuery = `CREATE TABLE IF NOT EXISTS "user_transactions" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT NOT NULL,
    "service_id" INT NOT NULL,
    "invoice_name" VARCHAR(255) NOT NULL,
    "amount" DECIMAL(10, 2) NOT NULL,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP,
    FOREIGN KEY ("user_id") REFERENCES "users" ("id"),
    FOREIGN KEY ("service_id") REFERENCES "services" ("id")
);`