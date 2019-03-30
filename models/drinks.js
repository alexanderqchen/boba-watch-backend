'use strict';
module.exports = (sequelize, DataTypes) => {
  const Drinks = sequelize.define('Drinks', {
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    price: DataTypes.INTEGER,
    date: DataTypes.DATE,
    photo: DataTypes.STRING
  }, {});
  Drinks.associate = function(models) {
    // associations can be defined here
  };
  return Drinks;
};