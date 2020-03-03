import knex from 'knex'

import doenv from 'dotenv'  //add env
doenv.config()


const database = {
  client: 'postgresql',
  connection: 'postgres://postgres:813621az@localhost:5432/typeorm',
  migrations: {
    directory: 'migrations',
    tableName: 'knex_migrations',
  },
  seeds: {
    directory:  'seeds',
  }, pool: {
    min: 0,
    max: 7,
    afterCreate: (conn, done) => {
      conn.query('SET timezone="UTC";', (err) => {
        if (err) {
          console.log(err)
        }
        done(err, conn)
      })
    }
  }
} as knex.Config

export = database
