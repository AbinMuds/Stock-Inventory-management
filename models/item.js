'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.item.belongsTo(models.profile);
      models.item.belongsToMany(models.order, {through: "itemsOrders"})
    }
  };
  item.init({
    name: DataTypes.STRING,
    imageLink: DataTypes.STRING,
    quantityOfPackage: DataTypes.INTEGER,
    quantityOfitemsPerPackage: DataTypes.INTEGER,
    totalCP: DataTypes.INTEGER,
    sellingPricePerPackage: DataTypes.INTEGER,
    sellingPricePerItem: DataTypes.INTEGER,
    costPricePerPackage: DataTypes.INTEGER,
    profileId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'item',
  });
  return item;
};