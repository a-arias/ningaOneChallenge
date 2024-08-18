const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

// Load environment variables from .env file
dotenv.config();

// Use to config.json if environment variables are not defined
const configFile = path.join(__dirname, 'config.json');
let config = JSON.parse(fs.readFileSync(configFile, 'utf8'));

config.baseUrl = process.env.BASE_URL || config.baseUrl;
config.apiUrl = process.env.API_URL || config.apiUrl;

module.exports = config;