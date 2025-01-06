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
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  current_company: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  YOE: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  RYOE: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  notice_period: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cur_location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pref_location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  current_ctc: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expected_ctc: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  resume: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lwd: {
    type: DataTypes.DATE,
    allowNull: true,
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
        fields: ['email', 'ph_no'], // Composite unique constraint
      },
    ],
  });

module.exports = Candidates;
