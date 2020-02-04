import {createConnection, Connection} from "typeorm";

export default class TypeConnection {
    private  static _app: TypeConnection

    getConnection(): Promise<void | Connection>{
        return createConnection()
            .then(connection => connection)
            .catch(err => err)
    }

    public static get getInstance(): TypeConnection {
        return this._app || (this._app = new this())
    }
}