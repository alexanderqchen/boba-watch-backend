'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    facebookUserId: DataTypes.STRING,
    budget: DataTypes.INTEGER,
    maxDrinks: DataTypes.INTEGER,
  }, {});
  Users.associate = function(models) {
    // associations can be defined here
  };
  return Users;
};