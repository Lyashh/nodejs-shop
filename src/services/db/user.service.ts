import { User, UserInterface } from '../../database/entity/user'
import DB from '../../database/connection/'
import {Connection, Any} from "typeorm";

export default class userService {
    private _db: DB
    private _connection: Connection | any
    constructor() {
        this._db = DB.getInstance
        this._db.getConnection()
            .then(connection => this._connection = connection)
            .catch(err => console.log(err))
    }

    createOne(newUser: UserInterface) {
        let user = new User()
        user.age = newUser.age
        user.email = newUser.email
        user.name = newUser.name

        return this._connection.manager
        .save(user)
        .then(user => {
            console.log("User has been saved. User id is", user.id);
        });
    }
}