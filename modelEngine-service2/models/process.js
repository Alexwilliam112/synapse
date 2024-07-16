'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Process extends Model {
    static associate(models) {
      // One Process belongs to one Company
      Process.belongsTo(models.Company, {
        foreignKey: 'CompanyId',
        as: 'company'
      });

      // One Process has many States
      Process.hasMany(models.State, {
        foreignKey: 'ProcessId',
        as: 'states'
      });

      // One Process has many Events
      Process.hasMany(models.Event, {
        foreignKey: 'ProcessId',
        as: 'events'
      });

      // One Process has many DataLinks
      Process.hasMany(models.DataLink, {
        foreignKey: 'ProcessId',
        as: 'dataLinks'  // Use lowercase 'dataLinks' to match the alias in the DataLink model
      });
    }
  }
  Process.init({
    processName: {
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
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    lastUpdate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    fitness: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    CompanyId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Process',
    tableName: 'Process',
    timestamps: false
  });

  return Process;
};
