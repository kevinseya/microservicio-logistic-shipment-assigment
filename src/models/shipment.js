// models/shipment.js
const { DataTypes } = require('sequelize');
const { postgresDb } = require('../config/db');

const Shipment = postgresDb.define('Shipment', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  order_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  user_carrier_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'ASSIGNED CARRIER'
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'shipments',
  timestamps: false
});

module.exports = Shipment;