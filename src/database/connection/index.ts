import Knex from 'knex'
import Config from '../knexfile'

export default class Connection {
    private  static _instance: Connection
    public _connection: Knex
    private constructor() {
        this._connection = Knex(Config as Knex.Config)
    }

    public get getConnection() {
        return this._connection
    }

    public static get getInstance(): Connection {
        return this._instance || (this._instance = new this())
    }
}
