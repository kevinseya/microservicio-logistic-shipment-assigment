// app.js
const express = require('express');
const shipmentRoutes = require('./routes/shipmentRoutes');
const { initializeDatabase } = require('./config/db');
const Shipment = require('./models/shipment');
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const startServer = async () => {
  try {
    // Initialize database connections
    await initializeDatabase();
    
   // Synchronize model with database
    await Shipment.sync({ force: false });
    console.log('Tabla sincronizada con PostgreSQL.');

    const app = express();
    app.use(express.json());
    app.use('/api/shipment', shipmentRoutes);

    const port = process.env.PORT || 6001;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
};

startServer();
