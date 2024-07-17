'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    static associate(models) {
      // One Event belongs to one Process
      Event.belongsTo(models.Process, {
        foreignKey: 'ProcessId',
        as: 'process'
      });
    }
  }
  Event.init({
    eventName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    identifier: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true
      }
    },
    frequency: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    time: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    benchmarkTime: {
      type: DataTypes.FLOAT,
      allowNull: false
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
    modelName: 'Event',
    tableName: 'Event',
    timestamps: false
  });

  return Event;
};
