/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable('accounts', (table) => {
      table.increments();
      table.string('accountname').notNullable().index();
      table.bigInteger('accountnumber').notNullable().index();
      table.timestamps(true, true);
  }).createTable('wallets', (table) => {
    table.increments();
    table.bigInteger('accountbalance').defaultTo(0);

    table.integer('account_id').unsigned().notNullable().references('id').inTable('accounts').onDelete('CASCADE').onUpdate('CASCADE');
    table.timestamps(true, true);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  return knex.schema.dropTable('wallets').dropTable('accounts').dropTable('users');
};
