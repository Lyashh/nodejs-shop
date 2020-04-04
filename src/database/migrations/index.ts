import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
	return knex.schema
		.createTable('registration', (table) => {
			table.increments('id').primary();
			table.string('title').notNullable();
		})
		.createTable('roles', (table) => {
			table.increments('id').primary();
			table.string('title').notNullable();
		})
		.createTable('delivery', (table) => {
			table.increments('id').primary();
			table.string('title');
		})
		.createTable('category', (table) => {
			table.increments('id').primary();
			table.string('title');
		})
		.createTable('users', (table) => {
			table.increments();
			table.bigInteger('registration_id').unsigned().notNullable()
				.references('id').inTable('registration').onDelete('CASCADE').index();
			table.bigInteger('role_id').unsigned().notNullable()
				.references('id').inTable('roles').onDelete('CASCADE').index();
			table.string('email').unique().notNullable();
			table.string('password');
			table.string('name');
			table.timestamp('created_at').defaultTo(knex.fn.now());
			table.timestamp('updated_at').defaultTo(knex.fn.now());
		})
		.createTable('products', (table) => {
			table.increments();
			table.string('title').notNullable();
			table.text('description').notNullable();
			table.float('price').notNullable();
			table.string('main_photo').notNullable();
			table.bigInteger('category_id').unsigned().notNullable()
				.references('id').inTable('category').onDelete('CASCADE').index();
		})
		.createTable('cart', (table) => {
			table.increments();
			table.integer('user_id').notNullable()
			table.integer('product_id').notNullable()
			table.integer('delivery_id').notNullable()
			table.integer('quantity').notNullable()
			table.boolean('paid').notNullable().defaultTo(false)
			table.timestamp('created_at').defaultTo(knex.fn.now())
			table.timestamp('updated_at').defaultTo(knex.fn.now())
		});
}

export async function down(knex: Knex): Promise<any> {
	return knex.schema
		.dropTable('users')
		.dropTable('registration')
		.dropTable('roles')
		.dropTable('products')
		.dropTable('cart')
		.dropTable('delivery')
		.dropTable('category');
}
