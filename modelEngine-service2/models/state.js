'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class State extends Model {
    static associate(models) {
      // One State belongs to one Process
      State.belongsTo(models.Process, {
        foreignKey: 'ProcessId',
        as: 'process'
      });
    }
  }
  State.init({
    eventName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    isTextEditable: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    shape: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    ProcessId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'State',
    tableName: 'State',
    timestamps: false
  });

  return State;
};
