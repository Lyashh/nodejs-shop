import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('cart', function(table) {
        table.increments();
        table.integer('user_id').notNullable()
        table.integer('product_id').notNullable()
        table.integer('delivery_id').notNullable()
        table.integer('quantity').notNullable()
        table.boolean('paid').notNullable().defaultTo(false)
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
      })
}

export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable('cart')
}


