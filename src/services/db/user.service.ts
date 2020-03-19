import DB from '../../database/connection'

import log4js   from 'log4js'
const logger = log4js.getLogger()
logger.level = 'debug'


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

    public static findByEmail(email: string): Promise<any> {
        return userService.knex.select('u.id, u.name, u.email')
            .from('users AS u')
            .where('u.email', email)
            .first()
            .then(user => user).catch(err => err)
    }

    public static findAll(): Promise<any> {
        return userService.knex('users').select(['id, name, email']).then(user => user).catch(err => err)
    }

    public static findById(id: number): Promise<any> {
        return userService.knex
            .select('u.name', 'u.id', 'u.email', 'rol.title AS role', 'reg.title AS registration')
            .from('users AS u')
            .leftJoin('roles AS rol', 'u.role_id', 'rol.id')
            .leftJoin('registration AS reg', 'u.registration_id', 'reg.id')
            .where('u.id', id)
            .first()
            .then(user => user).catch(err => err)
    }

    public static deleteById(id: number): Promise<any> {
        return userService.knex('users').where('id', id).del().then(user => user).catch(err => err)
    }

    public static async paginate(page: number, limit: number) {
        let offset
        page == 1 ? offset = 0 : offset = (page - 1) * limit

        const info = await userService.countRows()
        const maxPage = await userService.getMaxPage(info, Number(limit))
        

        return userService.knex
            .select('u.name', 'u.id', 'u.email')
            .from('users AS u')
            .limit(limit).offset(offset)
            .then( async (users: Array<Object>) => {
                if(users.length) {
                    return {users, maxPage}
                } else {
                    return {maxPage}
                } 
            }).catch(err => err)
    }

    public static async getMaxPage(infoRows, limit: Number) {
        let maxPage = Math.trunc(infoRows.rows[0].count / Number(limit))
        return maxPage == 0 ? ++maxPage : 
            Number.isInteger(Number(maxPage)) ? maxPage : ++maxPage
    }

    public static countRows() {
        return userService.knex.raw('SELECT count(*) FROM users').then(user => user).catch(err => err)
    }
 }


