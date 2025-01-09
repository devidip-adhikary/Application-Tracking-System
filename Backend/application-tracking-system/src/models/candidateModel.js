const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Candidates = sequelize.define('candidates', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  vendor_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'vendors',
      key: 'id',
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
  status:{
    type: DataTypes.STRING,
    allowNull: true,
  }
},
  {
    sequelize,
    timestamps: true, // Automatically adds `createdAt` and `updatedAt`
    freezeTableName: true,
  },);

module.exports = Candidates;
