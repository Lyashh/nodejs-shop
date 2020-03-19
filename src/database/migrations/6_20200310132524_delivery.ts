import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
	return knex.schema.createTable('delivery', (table) => {
		table.increments();
		table.string('title');
	});
}

export async function down(knex: Knex): Promise<any> {
	return knex.schema.dropTable('delivery');
}
