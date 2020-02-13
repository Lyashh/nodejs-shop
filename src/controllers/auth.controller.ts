import { Response, Request, NextFunction } from 'express'
import Validation from '../services/validation/joi'
import UserService from '../services/db/user.service'
import auth from '../services/auth/passport'
const passport = auth.getInstance


export default class AuthControoller {
    public googleCallback(req: Request, res: Response) : Response {
        console.log(req.session);
        console.log('callback');
        return res.json('/secret');
    }

    public registration(req: Request, res: Response) {
        UserService.createOne(req.body.user).then((result) => {
            if(result.name=="error") {
                return res.json({message: 'error', detail: result.detail})
            } else {
                return res.json({result})
            }  
        }).catch(err => res.json({err}))
    }

    public async userValidation(req: Request, res: Response, next: NextFunction) {
        if(req.body.user) {
            const validResylt = await Validation.userValidation(req.body.user)
            if(validResylt.error) {
                return res.json({error: validResylt.error.details[0]})
            } else {
                req.body.user.registration = 1
                next()
            }
        } else {
            return res.json({error: 'Request dont have field "user"'})
        }
        
    }
}