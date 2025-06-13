// repos/userRepo.js
const { mysqlDb } = require('../config/db');

const getCarriers = async () => {
  try {
    const [carriers] = await mysqlDb.query(
      'SELECT * FROM user WHERE role = :role AND active = true',
      {
        replacements: { role: 'CARRIER' },
        type: mysqlDb.QueryTypes.SELECT
      }
    );

    if (!carriers) return [];
    const carriersArray = Array.isArray(carriers) ? carriers : [carriers];
    return carriersArray.filter(Boolean);
  } catch (error) {
    console.error('Error getting carriers:', error);
    throw error;
  }
};

module.exports = { getCarriers };