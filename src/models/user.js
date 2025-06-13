const { Sequelize } = require('sequelize');
const { postgresDb } = require('../config/db');

const Shipment = postgresDb.define('Shipment', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  order_id: {
    type: Sequelize.UUID,
    allowNull: false
  },
  user_carrier_id: {
    type: Sequelize.UUID,
    allowNull: false
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false
  },
  created_at: {
    type: Sequelize.DATE,  
    defaultValue: Sequelize.fn('now')  
  },
  updated_at: {
    type: Sequelize.DATE,  
    defaultValue: Sequelize.fn('now')
  }
}, {
  tableName: 'Shipments',
  timestamps: false,
});

module.exports = { Shipment };
