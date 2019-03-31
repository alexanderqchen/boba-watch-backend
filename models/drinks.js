'use strict';
module.exports = (sequelize, DataTypes) => {
  const Drinks = sequelize.define('Drinks', {
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    price: DataTypes.INTEGER,
    date: DataTypes.DATE,
    photo: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Drinks.associate = function(models) {
    Drinks.belongsTo(models.Users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return Drinks;
};