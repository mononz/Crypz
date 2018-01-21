'use strict';

const fs = require('fs');

if (!fs.existsSync('.env')) {
  console.error('Follow the setup instructions in the README file!\n -> \'.env\' file does not exist');
  return;
}

if (!fs.existsSync('node_modules')) {
  console.error('Follow the setup instructions in the README file!\n -> \'node_modules\' dependencies are not installed');
  return;
}

if (!fs.existsSync('knexfile.js')) {
  console.error('Follow the setup instructions in the README file!\n -> \'knexfile.js\' file does not exist');
  return;
}

require('dotenv').config();
require('./app');