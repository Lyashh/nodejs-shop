import {createConnection, Connection} from "typeorm";

export default class TypeConnection {
    private  static _app: TypeConnection

    async getConnection() {
        try {
            const connection: Connection = await createConnection();
            console.log('Success Connection to DB');
            return connection
        } catch(error) {
            console.log({error})
        }
    }

    public static get getInstance(): TypeConnection {
        return this._app || (this._app = new this())
    }
}