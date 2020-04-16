import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
	return knex.schema
		.createTable('productsToPots', (table) => {
			table.increments('id').primary();
			table.bigInteger('product_id').notNullable();
			table.bigInteger('pot_id').notNullable();
		})
		.createTable('registration', (table) => {
			table.increments('id').primary();
			table.string('title').notNullable();
		})
		.createTable('pots', (table) => {
			table.increments('id').primary();
			table.string('title').notNullable();
		})
		.createTable('status', (table) => {
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
			table.string('age');
			table.string('title').notNullable();
			table.text('description').notNullable();
			table.float('price').notNullable();
			table.string('photo_url').notNullable();
			table.bigInteger('category_id').unsigned().notNullable()
				.references('id').inTable('category').onDelete('CASCADE').index();
		})
		.createTable('cart', (table) => {
			table.increments('id').primary();
			table.integer('quantity').notNullable();
			table.timestamp('created_at').defaultTo(knex.fn.now());
			table.timestamp('updated_at').defaultTo(knex.fn.now());
			table.bigInteger('user_id').unsigned().notNullable()
				.references('id').inTable('category').onDelete('CASCADE').index();
			table.bigInteger('product_id').unsigned().notNullable()
				.references('id').inTable('category').onDelete('CASCADE').index();
		})
		.createTable('order', (table) => {
			table.increments();
			table.float('sum').notNullable();
			table.boolean('paid').notNullable();
			table.specificType('intarray', 'integer ARRAY').notNullable();
			table.bigInteger('user_id').unsigned().notNullable()
				.references('id').inTable('category').onDelete('CASCADE').index();
			table.bigInteger('status_id').unsigned().notNullable()
				.references('id').inTable('status').onDelete('CASCADE').index();
			table.timestamp('created_at').defaultTo(knex.fn.now());
			table.timestamp('updated_at').defaultTo(knex.fn.now());
		});
}

export async function down(knex: Knex): Promise<any> {
	return knex.schema
		.dropTable('users')
		.dropTable('order')
		.dropTable('products')
		.dropTable('cart')
		.dropTable('registration')
		.dropTable('roles')
		.dropTable('delivery')
		.dropTable('category')
		.dropTable('status')
		.dropTable('productsToPots')
		.dropTable('pots');
}
