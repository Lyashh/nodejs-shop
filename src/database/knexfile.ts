import knex from 'knex'

import doenv from 'dotenv'  //add env
doenv.config()

const database = {
  client: 'postgresql',
  connection: process.env.DB_URL,
  migrations: {
    directory: 'migrations',
    tableName: 'knex_migrations',
  },
  seeds: {
    directory:  'seeds',
  },
} as knex.Config

export = database