exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', (table) => {
    table.increments();
    table.date('date_created').notNullable();
    table.date('date_updated').notNullable();
    table.text('message').notNullable();
    table.boolean('liked').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('notes');
};
