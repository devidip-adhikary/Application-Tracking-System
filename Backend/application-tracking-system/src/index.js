require("dotenv").config();
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swaggerDefinition");
const { connectToDatabase, sequelize } = require("./config/db");
const routes = require("./routes/routes");

const app = express();
const port = process.env.PORT;
app.use(cors());

// Middleware
app.use(bodyParser.json());

// Swagger Docs
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Connect to the database and sync models (before starting the server)
const startServer = async () => {
  try {
    // Connect to the DB
    await connectToDatabase();

    // Ensure the tables are created (this will create missing tables based on models)
    await sequelize.sync({ alter: true }); // use `{ alter: true }` to automatically create or update tables

    // Start the server only after syncing DB
    app.listen(port || 8000, () => {
      console.log(`🚀 Server is running at PORT ${port}`);
    });
  } catch (error) {
    console.error("❌ Error starting the server:", error);
  }
};

startServer();

// Routes
app.use("/api", routes);
