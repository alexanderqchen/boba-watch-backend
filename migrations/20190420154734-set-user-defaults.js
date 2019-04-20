'use strict';
const { DEFAULT_BUDGET, DEFAULT_MAXDRINKS } = require('../config/defaults')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn(
        'Users',
        'budget',
        {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: DEFAULT_BUDGET
        }
      ),
      queryInterface.changeColumn(
        'Users',
        'maxDrinks',
        {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: DEFAULT_MAXDRINKS
        }
      ),
      queryInterface.changeColumn(
        'Users',
        'public',
        {
          type: DataTypes.BOOLEAN,
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
          type: DataTypes.INTEGER
        }
      ),
      queryInterface.changeColumn(
        'Users',
        'maxDrinks',
        {
          type: DataTypes.INTEGER
        }
      ),
      queryInterface.changeColumn(
        'Users',
        'public',
        {
          type: DataTypes.BOOLEAN
        }
      )
    ])
  }
};
