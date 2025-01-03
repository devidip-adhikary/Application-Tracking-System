const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const SubStatus = sequelize.define('sub_status', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  status_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'status_master',
      key: 'id',
    },
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

module.exports = SubStatus;
