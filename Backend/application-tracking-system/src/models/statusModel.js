const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Statuses = sequelize.define('status_master', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},
{
  sequelize,
  timestamps: true, // Automatically adds `createdAt` and `updatedAt`
  freezeTableName: true,
});

module.exports = Statuses;
