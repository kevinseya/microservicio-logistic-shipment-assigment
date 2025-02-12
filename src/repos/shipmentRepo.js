// repos/shipmentRepo.js
const Shipment = require('../models/shipment');

const getShipmentsCountByCarrier = async () => {
  try {
    const counts = await Shipment.findAll({
      attributes: [
        'user_carrier_id',
        [Shipment.sequelize.fn('COUNT', '*'), 'count']
      ],
      group: ['user_carrier_id']
    });
    return counts.map(count => count.get({ plain: true }));
  } catch (error) {
    console.error('Error in getShipmentsCountByCarrier:', error);
    return [];
  }
};

const createShipment = async (orderId, carrierId) => {
  try {
    const shipment = await Shipment.create({
      order_id: orderId,
      user_carrier_id: carrierId,
      status: 'PENDING'
    });
    return shipment.get({ plain: true });
  } catch (error) {
    console.error('Error in createShipment:', error);
    throw new Error(`Failed to create shipment: ${error.message}`);
  }
};

module.exports = {
  getShipmentsCountByCarrier,
  createShipment
};