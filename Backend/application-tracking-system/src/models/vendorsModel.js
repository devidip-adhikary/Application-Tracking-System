const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Vendors = sequelize.define(
  "vendors",
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    spoc: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ph_no: {
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
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["email", "ph_no"], // Composite unique constraint
      },
    ],
  }
);

module.exports = Vendors;
