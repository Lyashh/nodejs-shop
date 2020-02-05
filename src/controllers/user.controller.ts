import { Response, Request } from 'express'
import {UserInterface} from '../services/db/user.service'
import UserService from '../services/db/user.service'

export default class UserControoller {
    public createOne(req: Request, res: Response) {
        const newUser: UserInterface = req.body.user        
        return UserService.createOne(newUser)
            .then(user => res.json({user}))
            .catch(err => res.json({err}))
    }
}