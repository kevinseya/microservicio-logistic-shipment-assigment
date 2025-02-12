const express = require('express');
const { assignCarrier } = require('../controllers/shipmentController');

const router = express.Router();

router.post('/assign', assignCarrier);

module.exports = router;
