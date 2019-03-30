'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'Users',
        'budget',
        Sequelize.INTEGER
      ),
      queryInterface.addColumn(
        'Users',
        'maxDrinks',
        Sequelize.INTEGER
      )
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(
        'Users',
        'budget',
      ),
      queryInterface.removeColumn(
        'Users',
        'maxDrinks',
      )
    ])
  }
};
