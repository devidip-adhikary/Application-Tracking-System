const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Openings = sequelize.define('openings', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  client_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'clients',
      key: 'id',
    },
  },
  tech_stack_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'tech_stack',
      key: 'id',
    },
  },
  job_description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},
  {
    sequelize,
    timestamps: true, // Automatically adds `createdAt` and `updatedAt`
    freezeTableName: true,
  });

module.exports = Openings;
