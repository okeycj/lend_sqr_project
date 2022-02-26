// Update with your config settings.
require('dotenv').config()
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'mysql',
    version: '5.7',
    connection: {
      host : process.env.MYSQL_HOST,
      port : process.env.MYSQL_PORT,
      user : process.env.MYSQL_USERNAME,
      password : process.env.MYSQL_PASSWORD,
      database : process.env.MYSQL_DATABASE
    }
  },
  
  production: {
    client: 'mysql',
    version: '5.7',
    connection: process.env.CLEARDB_DATABASE_URL
  },

};
