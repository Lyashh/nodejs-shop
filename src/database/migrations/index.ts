import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
	return knex.schema
		.createTable('users', (table) => {
			table.increments();
			table.integer('registration_id').notNullable();
			table.integer('role_id').notNullable().defaultTo(1);
			table.string('email').unique().notNullable();
			table.string('password');
			table.string('name');
			table.timestamp('created_at').defaultTo(knex.fn.now());
			table.timestamp('updated_at').defaultTo(knex.fn.now());
		})
		.createTable('registration', (table) => {
			table.increments();
			table.string('title').notNullable();
		})
		.createTable('roles', (table) => {
			table.increments();
			table.string('title').notNullable();
		})
		.createTable('products', (table) => {
			table.increments();
			table.string('title').notNullable();
			table.text('description').notNullable();
			table.float('price').notNullable();
			table.string('main_photo').notNullable();
			table.integer('category_id').notNullable();
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
		})
		.createTable('delivery', (table) => {
			table.increments();
			table.string('title');
		})
		.createTable('category', (table) => {
			table.increments();
			table.string('title');
		});
}

export async function down(knex: Knex): Promise<any> {
	return knex.schema
		.dropTable('users')
		.dropTable('registration')
		.dropTable('roles')
		.dropTable('products')
		.dropTable('products')
		.dropTable('delivery')
		.dropTable('category');

}
