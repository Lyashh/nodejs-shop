import { Response, Request, NextFunction } from 'express'
import Validation from '../services/validation/joi'
import UserService from '../services/db/user.service'

export default class AuthControoller {
    public googleCallback(req: Request, res: Response) : Response {
        if(req.isAuthenticated()) {
            return res.json({message: "success", detail: req.session!.passport.user})
        } else {
            return res.json({message: "error", detail: "cant auth"})
        }
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

    public logout(req: Request, res: Response) {
        if(req.isAuthenticated()) {
            return res.json({message: "success", detail: "success logout"})
        } else {
            return res.json({message: "error", detail: "You must login"})
        }
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

    public isAuthMiddleware(req: Request, res: Response, next: NextFunction) {
        if(req.isAuthenticated()) {
            next()
        } else {
            return res.json({message: "error", detail: "You must login"})
        }
    }
}