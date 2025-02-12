const { assignCarrierToOrder } = require('../services/shipmentService');

const assignCarrier = async (req, res) => {
  try {
    const { orderId } = req.body;  
    if (!orderId) {
      return res.status(400).json({ error: 'Order ID is required' });
    }

    const shipment = await assignCarrierToOrder(orderId);

    res.status(201).json(shipment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error assigning carrier to order' });
  }
};

module.exports = { assignCarrier };
