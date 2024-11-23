let createServiceTableQuery = `CREATE TABLE IF NOT EXISTS "services" (
    "id" SERIAL PRIMARY KEY,
    "code" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "icon" VARCHAR(255) NOT NULL,
    "price" DECIMAL(10, 2),
    "is_deduct" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP
);`