import { User } from '../../database/entity/user'
import DB from '../../database/connection/'
import {Connection} from "typeorm";

export interface UserInterface{
    name: string
    age: number
    email: string
}

export default class userService {
    public static  _db: DB = DB.getInstance
    public static async createOne(newUser: UserInterface): Promise<any> {
        console.log('CreateOne function');
        let user = new User()
        user.age = newUser.age
        user.email = newUser.email
        user.name = newUser.name

        userService._db.getConnection().then(connection => {
            console.log(connection);
            
        })
            /*console.log('Connection');
            return connection.manager
                .save(user)
                .then(user => user)*/
    }
}

