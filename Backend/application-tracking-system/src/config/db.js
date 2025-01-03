require('dotenv').config();
const { Sequelize } = require('sequelize');
// Initialize Sequelize
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: String(process.env.DB_SERVER),
  dialect: 'mssql',
  port: parseInt(process.env.DB_PORT) || 1433,
  dialectOptions: {
    options: {
      enableArithAbort: true,
      encrypt: process.env.DB_ENCRYPT === 'true', // Use encryption for Azure SQL Server
      trustServerCertificate: true,
    },
  },
});

// Test the connection
const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

module.exports = { sequelize, connectToDatabase };
