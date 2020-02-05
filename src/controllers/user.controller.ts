import { Response, Request } from 'express'
import UserService from '../services/db/user.service'
import { UserInterface } from '../database/entity/user'

export default class UserControoller {
    private _userService: UserService
    constructor() {
        this._userService = new UserService()
    }
    public createOne(req: Request, res: Response) : Response {
        /*const newUser: UserInterface = {
            name: req.body.name,
            age: req.body.age,
            email: req.body.email
        }*/
        return res.json('Create one user')
    }
}