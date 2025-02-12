// config/db.js
const { Sequelize } = require('sequelize');
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const mysqlDb = new Sequelize({
  dialect: 'mysql',
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  logging: false
});

const postgresDb = new Sequelize({
  dialect: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,  
      rejectUnauthorized: false     }
  }
});


const initializeDatabase = async () => {
  try {
    await mysqlDb.authenticate();
    console.log('MySQL connection has been established successfully.');
    
    await postgresDb.authenticate();
    console.log('PostgreSQL connection has been established successfully.');
  } catch (err) {
    console.error('Unable to connect to the databases:', err);
    process.exit(1);
  }
};

module.exports = { mysqlDb, postgresDb, initializeDatabase };