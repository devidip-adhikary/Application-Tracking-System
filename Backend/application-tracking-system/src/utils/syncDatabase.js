const { sequelize } = require("../config/db");

const User = require("../models/userModel");
require("../models/vendorsModel");
require("../models/statusModel");
require("../models/clientModel");
require("../models/techStackModel");
require("../models/candidateModel");
require("../models/openingModel");
require("../models/subStatusModel");
require("../models/openingsVsCandidatesModel");

const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true, force: false });
    await create_default_users();
    console.log("Database synced successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Error syncing database:", error);
    process.exit(1);
  }
};

const create_default_users = async () => {
  try {
    const defaultUsers = [
      {
        name: "Devidip Adhikary",
        email: "devidip.adhikary@protivitiglobal.in",
        role: "admin",
        password: "pro@1234",
      },
      {
        name: "Sarbajit Chakraborty",
        email: "sarbajit.c@protivitiglobal.in",
        role: "admin",
        password: "pro@1234",
      },
      {
        name: "Abhirup Roy",
        email: "abhirup.roy@protivitiglobal.in",
        role: "admin",
        password: "pro@1234",
      },
    ];
    for (const user of defaultUsers) {
      await User.create(user);
    }
    console.log("Default users created successfully.");
  } catch (error) {
    console.error("Error while creating default users", error);
  }
};

syncDatabase();
