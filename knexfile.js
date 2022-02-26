// Update with your config settings.
require('dotenv').config()
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'mysql',
    version: '5.7',
    connection: process.env.CLEARDB_DATABASE_URL
  },
  
  production: {
    client: 'mysql',
    version: '5.7',
    connection: process.env.CLEARDB_DATABASE_URL
  },

};
