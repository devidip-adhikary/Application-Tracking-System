const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const OpeningVsCandidates = sequelize.define('opening_vs_candidates', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  opening_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'openings',
      key: 'id',
    },
  },
  candidate_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'candidates',
      key: 'id',
    },
  },
  status_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'status_master',
      key: 'id',
    },
  },
  sub_status_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'sub_status',
      key: 'id',
    },
  },
},
  {
    sequelize,
    timestamps: true, // Automatically adds `createdAt` and `updatedAt`
    freezeTableName: true,
  });

module.exports = OpeningVsCandidates;
