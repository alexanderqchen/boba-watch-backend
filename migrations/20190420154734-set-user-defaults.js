'use strict';
const { DEFAULT_BUDGET, DEFAULT_MAXDRINKS } = require('../config/defaults')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn(
        'Users',
        'budget',
        {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: DEFAULT_BUDGET
        }
      ),
      queryInterface.changeColumn(
        'Users',
        'maxDrinks',
        {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: DEFAULT_MAXDRINKS
        }
      ),
      queryInterface.changeColumn(
        'Users',
        'public',
        {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
        }
      )
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn(
        'Users',
        'budget',
        {
          type: Sequelize.INTEGER
        }
      ),
      queryInterface.changeColumn(
        'Users',
        'maxDrinks',
        {
          type: Sequelize.INTEGER
        }
      ),
      queryInterface.changeColumn(
        'Users',
        'public',
        {
          type: Sequelize.BOOLEAN
        }
      )
    ])
  }
};
