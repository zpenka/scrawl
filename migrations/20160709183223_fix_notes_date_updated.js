exports.up = function(knex, Promise) {
  return knex.raw('ALTER TABLE `notes` MODIFY COLUMN `date_updated` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP;');
};

exports.down = function(knex, Promise) {};
