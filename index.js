'use strict';

require('dotenv').config();

let envsNotSet = [];
if (!process.env.btcApiKey) {
  envsNotSet.push('btcApiKey');
}
if (!process.env.btcApiSecret) {
  envsNotSet.push('btcApiSecret');
}
if (!process.env.coinbaseApiKey) {
  envsNotSet.push('coinbaseApiKey');
}
if (!process.env.coinbaseApiSecret) {
  envsNotSet.push('coinbaseApiSecret');
}

if (envsNotSet.length > 0) {
  console.error('The following environment variables are not set!\n -> ' + envsNotSet.join(', ') + '\nUpdate your .env file');
} else {
  require('./app');
}