const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Openings = require("./openingModel");
const Candidates = require("./candidateModel");
const Statuses = require("./statusModel");
const SubStatus = require("./subStatusModel");

const OpeningVsCandidates = sequelize.define(
  "opening_vs_candidates",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    opening_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "openings",
        key: "id",
      },
    },
    candidate_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "candidates",
        key: "id",
      },
    },
    status_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "status_master",
        key: "id",
      },
    },
    sub_status_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "sub_status",
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
OpeningVsCandidates.belongsTo(Openings, { foreignKey: "opening_id" });
// OpeningVsCandidates.belongsTo(Candidates, { foreignKey: "candidate_id" });
OpeningVsCandidates.belongsTo(Statuses, { foreignKey: "status_id" });
OpeningVsCandidates.belongsTo(SubStatus, { foreignKey: "sub_status_id" });

module.exports = OpeningVsCandidates;
