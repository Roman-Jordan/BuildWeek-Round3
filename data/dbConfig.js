const knex = require('knex');
const config = require('../knexfile.js');
const env = process.env.DB_ENV || 'development'
console.log(env)
module.exports = knex(config[env]);