import DB from '../../database/connection'

export default class userService {
    public static async createOne(newUser): Promise<any> {
        const knex = await DB.getInstance.getConnection
          return knex('users').where('login', newUser.login).orWhere('email', newUser.email).then(res => {
            if (res.length === 0) {
                return knex('users').insert(newUser).returning(['id', 'email']).then(res => {
                    return {
                        message: 'New User', 
                        user: res
                    }
                }).catch(err => err)
            } else {
                return {
                    message: 'User already exists',
                    user: {
                        id: res[0].id,
                        email: res[0].email
                    }
                }
            }
          }).catch(err => err)
    }
}

