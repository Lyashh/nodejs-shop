import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('registration', function(table) {
        table.increments();
        table.string('title').notNullable();
      })
}

export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable('registration');
}


