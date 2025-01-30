require("dotenv").config();
const { Sequelize } = require("sequelize");

// Initialize Sequelize with DB_URL
const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Required for Render PostgreSQL
    },
  },
  logging: false, // Disable logging for cleaner console output
});

// Test the connection
const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connected to PostgreSQL successfully!");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
  }
};

// Connect to DB when the backend starts
connectToDatabase();

module.exports = { sequelize, connectToDatabase };
