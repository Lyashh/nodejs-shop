import DB from '../../database/connection'

export interface UserInterface{
    name: string
    password: string
    email: string
}

export default class userService {
    public static async createOne(newUser: UserInterface): Promise<any> {
        const knex = await DB.getInstance.getConnection
        return knex('users').insert(newUser).then(result => result)
            .catch(err => err)
    }
}

