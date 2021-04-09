'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.order.belongsToMany(models.item, {through: "itemsOrders"})
      models.order.belongsTo(models.user);
    }
  };
  order.init({
    userId: DataTypes.INTEGER,
    orderName: DataTypes.STRING,
    complete: DataTypes.BOOLEAN,
    orderFrom: DataTypes.STRING,
    orderTo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'order',
  });
  return order;
};