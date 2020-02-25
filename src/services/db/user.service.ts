import DB from '../../database/connection'

export default class userService {
    public static knex = DB.getInstance.getConnection

    public static createorFindOne(newUser): Promise<any> {
          return userService.knex('users').where('email', newUser.email).then(res => {
            if (res.length === 0) {
                return userService.knex('users').insert(newUser).returning(['id', 'email', 'role_id', 'name']).then(res => {
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
                        email: res[0].email,
                        name: res[0].name
                    }
                }
            }
          }).catch(err => err)
    }

    public static findByEmail(email): Promise<any> {
        return userService.knex('users').where('email', email).first('*').then(user => user).catch(err => err)
    }
}

