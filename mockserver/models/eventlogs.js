'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Eventlogs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Eventlogs.init({
    processName: DataTypes.STRING,
    caseId: DataTypes.STRING,
    timestamp: DataTypes.STRING,
    eventName: DataTypes.STRING,
    name: DataTypes.STRING,
    department: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Eventlogs',
    timestamps: false
  });
  return Eventlogs;
};