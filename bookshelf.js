const knexfile  = require('./knexfile.js');

const config    = knexfile[process.env.NODE_ENV || 'development'];
const knex      = require('knex')(config); 
const bookshelf = require('bookshelf')(knex);

console.log('Using environment: ' + process.env.NODE_ENV || 'development');

module.exports = bookshelf;