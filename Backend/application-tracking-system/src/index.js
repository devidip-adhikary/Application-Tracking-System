require("dotenv").config();
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swaggerDefinition");
const { connectToDatabase } = require("./config/db");
const routes = require("./routes/routes");

const app = express();
const port = process.env.PORT;
app.use(cors());

// Middleware
app.use(bodyParser.json());

// Swagger Docs
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Connect to the database
const startServer = async () => {
  await connectToDatabase();

  await sequelize.sync({ alter: true }); // ← this line creates the tables if not exists

  // Then start your server
  app.listen(process.env.PORT || 8000, () => {
    console.log("🚀 Server running...");
  });
};

startServer();

// Routes
app.use("/api", routes);

// Start the server
app.listen(port, () => {
  console.log(`Server running at PORT ${port}`);
});
