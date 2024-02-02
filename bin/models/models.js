const sequelizes = require('../db');
const { DataTypes } = require('sequelize');

const User = sequelizes.define('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  },
  chatId: { type: DataTypes.STRING, unique: true },
  right: { type: DataTypes.INTEGER, defaultValue: 0 },
  wrong: { type: DataTypes.INTEGER, defaultValue: 0 },
  createdAt: { type: DataTypes.DATE },
  updatedAt: { type: DataTypes.DATE },
});
module.exports = User;
