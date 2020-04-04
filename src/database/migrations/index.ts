import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
	return knex.schema
<<<<<<< HEAD
		.createTable('users', (table) => {
			table.increments();
			table.integer('registration_id').notNullable();
			table.integer('role_id').notNullable().defaultTo(1);
=======
		.createTable('registration', (table) => {
			table.increments('id').primary();
			table.string('title').notNullable();
		})
		.createTable('roles', (table) => {
			table.increments('id').primary();
			table.string('title').notNullable();
		})
		.createTable('users', (table) => {
			table.increments();
			table.bigInteger('registration_id').unsigned().notNullable()
				.references('id').inTable('registration').onDelete('CASCADE').index();
			table.bigInteger('role_id').unsigned().notNullable()
				.references('id').inTable('roles').onDelete('CASCADE').index();
>>>>>>> a7ad2dc746cff409ab2f4e9ee25fc786d0a825ab
			table.string('email').unique().notNullable();
			table.string('password');
			table.string('name');
			table.timestamp('created_at').defaultTo(knex.fn.now());
			table.timestamp('updated_at').defaultTo(knex.fn.now());
		})
<<<<<<< HEAD
		.createTable('registration', (table) => {
			table.increments();
			table.string('title').notNullable();
		})
		.createTable('roles', (table) => {
			table.increments();
			table.string('title').notNullable();
		})
=======
>>>>>>> a7ad2dc746cff409ab2f4e9ee25fc786d0a825ab
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
<<<<<<< HEAD
		.dropTable('products')
=======
		.dropTable('cart')
>>>>>>> a7ad2dc746cff409ab2f4e9ee25fc786d0a825ab
		.dropTable('delivery')
		.dropTable('category');

}
