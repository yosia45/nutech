const { Client } = require("pg");
const createUserTableQuery = require("../models/user");
const createBannerTableQuery = require("../models/banner");
const createServiceTableQuery = require("../models/service");
const createUserProfileTableQuery = require("../models/userProfile");
const createUserMoneyTableQuery = require("../models/userMoney");
const createUserTransactionTableQuery = require("../models/userTransaction");

const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

const autoMigrate = async () => {
  const queries =  [
    createUserTableQuery,
    createBannerTableQuery,
    createServiceTableQuery,
    createUserProfileTableQuery,
    createUserMoneyTableQuery,
    createUserTransactionTableQuery
  ]
  try {
    for (const query of queries) {
      await client.query(query);
    }
    console.log("All migrations completed successfully.");
  } catch (error) {
    console.error("Migration failed:", error);
  }
};

client.connect().then(() => {
  console.log("Database connected.");
  autoMigrate();
});

module.exports = client;
