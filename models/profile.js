'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.profile.belongsTo(models.user);
      models.user.hasMany(models.item);
    }
  };
  profile.init({
    name: DataTypes.STRING,
    userid: DataTypes.INTEGER,
    imageLink: DataTypes.STRING,
    description: DataTypes.STRING,
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'profile',
  });
  return profile;
};