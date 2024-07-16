'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DataLink extends Model {
    static associate(models) {
      // One DataLink belongs to one Process
      DataLink.belongsTo(models.Process, {
        foreignKey: 'ProcessId',
        as: 'process'
      });
    }
  }
  DataLink.init({
    canRelinkFrom: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    identifier: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true
      }
    },
    from: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    to: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    text: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ProcessId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'DataLink',
    tableName: 'DataLink',
    timestamps: false
  });
  return DataLink;
};
