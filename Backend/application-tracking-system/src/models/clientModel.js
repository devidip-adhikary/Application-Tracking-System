const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Clients = sequelize.define(
  "clients",
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
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    timestamps: true, // Automatically adds `createdAt` and `updatedAt`
    freezeTableName: true,
  }
);
module.exports = Clients;
