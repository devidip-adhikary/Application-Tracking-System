const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Role = sequelize.define('roles', {
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

module.exports = Role;
