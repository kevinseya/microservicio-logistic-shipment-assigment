const { getCarriers } = require('../repos/userRepo');
const { getShipmentsCountByCarrier, createShipment } = require('../repos/shipmentRepo');

const assignCarrierToOrder = async (orderId) => {
  // get active carrier on user
  const carriers = await getCarriers();
  console.log('Carriers:', carriers);

  // verify that carriers are array and be elements
  if (!Array.isArray(carriers) || carriers.length === 0) {
    throw new Error('No carriers found.');
  }

  // get shipments for carrier 
  let carrierShipmentCounts;
  try {
    carrierShipmentCounts = await getShipmentsCountByCarrier();
    console.log('Carrier shipment counts:', carrierShipmentCounts);
  } catch (error) {
    console.error('Error fetching shipment counts:', error);
    carrierShipmentCounts = [];
  }

  let selectedCarrier;
  
  // if not shipment, use the first carrier
  if (!carrierShipmentCounts || carrierShipmentCounts.length === 0) {
    console.log('No shipments found, assigning first carrier.');
    selectedCarrier = carriers[0];
    
    // Verified carrier
    if (!selectedCarrier || !selectedCarrier.id) {
      console.error('Selected carrier is invalid:', selectedCarrier);
      throw new Error('Invalid carrier data structure');
    }
  } else {
    // If found shipments, create a map of shipments for carrier
    const shipmentCountMap = new Map(
      carrierShipmentCounts.map(count => [count.user_carrier_id, count.count])
    );

    // found carrier with fewer shipments
    selectedCarrier = carriers.reduce((prev, current) => {
      const prevCount = shipmentCountMap.get(prev.id.toString('hex')) || 0;
      const currentCount = shipmentCountMap.get(current.id.toString('hex')) || 0;
      return prevCount <= currentCount ? prev : current;
    });
  }

  // Carrier selecter verified
  if (!selectedCarrier || !selectedCarrier.id) {
    throw new Error('Carrier assignment failed, no valid carrier found.');
  }

  // Convert id to UUID
  const carrierIdAsString = selectedCarrier.id.toString('hex');
  
  // id verified for carrier
  console.log('Selected carrier ID:', carrierIdAsString);
  
  // Create a new shipment
  const shipment = await createShipment(orderId, carrierIdAsString);
  return shipment;
};

module.exports = { assignCarrierToOrder };