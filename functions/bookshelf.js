const config    = require('./knexfile.js')['production'];
const knex      = require('knex')(config);
const bookshelf = require('bookshelf')(knex);

module.exports = bookshelf;