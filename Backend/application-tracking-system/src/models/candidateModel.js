const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Vendors = require("./vendorsModel");
const Statuses = require("./statusModel");
const OpeningVsCandidates = require("./openingsVsCandidatesModel");

const Candidates = sequelize.define(
  "candidates",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    vendor_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "vendors",
        key: "id",
      },
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
    ph_no: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    current_company: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    YOE: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    RYOE: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    notice_period: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cur_location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pref_location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    current_ctc: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    expected_ctc: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    resume: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lwd: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    status: {
      type: DataTypes.STRING,
      references: {
        model: "status",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: true, // Automatically adds `createdAt` and `updatedAt`
    freezeTableName: true,
  }
);

// Define associations
Candidates.belongsTo(Vendors, { foreignKey: "vendor_id" }); // Candidates belongs to Vendors
Candidates.belongsTo(Statuses, { foreignKey: "status" }); // Candidates belongs to Vendors

Candidates.hasMany(OpeningVsCandidates, {
  foreignKey: "candidate_id",
  as: "openings",
}); // New association

module.exports = Candidates;
