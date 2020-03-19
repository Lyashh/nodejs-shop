import * as Knex from "iknex";

export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('delivery', function(table) {
        table.increments()
        table.string('title')
      })
}

export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable('delivery')
}


