import { Response, Request, NextFunction } from 'express'
import Validation from '../services/validation/joi'

export default class AuthControoller {
    public googleCallback(req: Request, res: Response) : Response {
        console.log(req.session);
        console.log('callback');
        return res.json('/secret');
    }

    public registration(req: Request, res: Response) : Response {
        return res.json('Success registration')
    }

    public async userValidation(req: Request, res: Response, next: NextFunction) {
        if(req.body.user) {
            const validResylt = await Validation.userValidation(req.body.user)
            if(validResylt.error) {
                console.log(validResylt.error);
                return res.json({error: validResylt.error.details[0]})
            } else {
                next()
            }
        } else {
            return res.json({error: 'Request dont have field "user"'})
        }
        
    }
}