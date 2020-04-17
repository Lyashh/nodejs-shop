import knex from 'knex';
import doenv from 'dotenv';
// add env
doenv.config();

const database = {
	client: 'postgresql',
	connection: process.env.PG_URL,
	migrations: {
		directory: 'migrations',
		tableName: 'knex_migrations',
	},
	seeds: {
		directory: 'seeds',
	},
	pool: {
		min: 0,
		max: 7,
		afterCreate: (conn, done) => {
			conn.query('SET timezone="UTC";', (err) => {
				if (err) {
					console.log(err);
				}
				done(err, conn);
			});
		},
	},
} as knex.Config;

export = database
