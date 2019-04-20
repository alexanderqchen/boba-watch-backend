'use strict';
const { DEFAULT_BUDGET, DEFAULT_MAXDRINKS } = require('../config/defaults')

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    facebookUserId: DataTypes.STRING,
    budget: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: DEFAULT_BUDGET
    },
    maxDrinks: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: DEFAULT_MAXDRINKS
    },
    public: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {});
  Users.associate = function(models) {
    // associations can be defined here
  };
  return Users;
};