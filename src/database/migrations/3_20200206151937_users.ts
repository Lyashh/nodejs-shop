import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('users', function(table) {
        table.increments();
        table.integer('registration_id').notNullable();
        table.integer('role_id').notNullable().defaultTo(1)
        table.string('email').unique().notNullable();
        table.string('password')
        table.string('name')
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
      })
}

export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable('users');
}

