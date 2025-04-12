require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST, // use DB_HOST instead of DB_SERVER
    dialect: "mysql",
    port: parseInt(process.env.DB_PORT) || 3306,
    dialectOptions: {
      connectTimeout: 10000,
    },
    logging: false,
  }
);

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connected to the database successfully.");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
  }
};

module.exports = { sequelize, connectToDatabase };
