'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      quantityOfPackage: {
        type: Sequelize.INTEGER
      },
      quantityOfitemsPerPackage: {
        type: Sequelize.INTEGER
      },
      totalCP: {
        type: Sequelize.INTEGER
      },
      sellingPricePerPackage: {
        type: Sequelize.INTEGER
      },
      sellingPricePerItem: {
        type: Sequelize.INTEGER
      },
      costPricePerPackage: {
        type: Sequelize.INTEGER
      },
      profileId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('items');
  }
};