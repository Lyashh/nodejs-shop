import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('products', function(table) {
        table.increments();
        table.integer('user_id').notNullable()
        table.integer('product_id').notNullable()
        table.integer('quantity').notNullable()
      })
}

export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable('products')
}


