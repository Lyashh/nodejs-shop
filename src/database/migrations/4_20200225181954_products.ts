import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
	return knex.schema.createTable('products', (table) => {
		table.increments()
		table.string('title').notNullable()
		table.text('description').notNullable()
		table.float('price').notNullable()
		table.string('main_photo').notNullable()
		table.string('manufacturer').notNullable()
		table.string('category').notNullable()
	})
}

export async function down(knex: Knex): Promise<any> {
	return knex.schema.dropTable('products')
}


