const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const TechStack = sequelize.define('tech_stack', {
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

module.exports = TechStack;
