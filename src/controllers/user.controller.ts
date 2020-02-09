import { Response, Request } from 'express'
import {UserInterface} from '../services/db/user.service'
import UserService from '../services/db/user.service'

export default class UserControoller {
    public createOne(req: Request, res: Response) {
        const newUser: UserInterface = req.body.user        
        return UserService.createOne(newUser)
            .then(user => {
                if(user.name) {
                    res.json({error: user, message: 'error'})
                } else {
                    res.json({message: 'success'})
                }
            }) .catch(err => res.json({err}))
    }
}