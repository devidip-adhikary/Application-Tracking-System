const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Clients = require("./clientModel"); // Import Clients model
const TechStack = require("./techStackModel"); // Import TechStack model

const Openings = sequelize.define(
  "openings",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    client_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "clients", // Foreign key reference
        key: "id",
      },
    },
    tech_stack_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "tech_stack", // Foreign key reference
        key: "id",
      },
    },
    job_description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    number_of_requiremnts: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    work_mode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
  }
);

// Define associations
Openings.belongsTo(Clients, { foreignKey: "client_id" }); // Opening belongs to Clients
Openings.belongsTo(TechStack, { foreignKey: "tech_stack_id" }); // Opening belongs to TechStack

module.exports = Openings;
