const path = require('path');

const envPath = path.resolve(__dirname, '..', '..', '..', '.env.local');
require('dotenv').config({ path: envPath });

const environment = process.env.NODE_ENV || 'development';

const suffix = {
  prod: "",
  production: "",
  dev: "-dev",
  development: "-dev",
  test: "-test",
};

const options = {
  host: process.env.POSTGRES_HOST || 'postgres',
  port: process.env.POSTGRES_PORT || '3306',
  database: 
    `${process.env.POSTGRES_DB_NAME || 'delivery-app'}${suffix[environment] || suffix.test}`,
  username: process.env.POSTGRES_USER || 'root',
  password: process.env.POSTGRES_PASSWORD || '',
  dialect: 'postgres',
  dialectOptions: {
    timezone: 'Z',
  },
  logging: false,
};

module.exports = {
  development: {
    ...options,
  },
  test: {
    ...options,
  },
  production: {
    ...options,
  },
};
