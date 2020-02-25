import { Response, Request, NextFunction } from 'express'
import bcrypt from 'bcrypt'
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
        req.body.user.registration_id = 1
        return bcrypt.hash(req.body.user.password, 10).then(hash => {
            req.body.user.password = hash
            return UserService.createorFindOne(req.body.user).then((result) => {
                if(result.name=="error") {
                    return res.json({message: 'error', detail: result.detail})
                } else {
                    return res.status(201).json({result})
                }  
            }).catch(err => res.json({err}))
        })
    }

    public login(req: Request, res: Response) {
        res.json({message: 'success', detail: req.session!.passport.user});
    }

    public localCallback(req: Request, res: Response) {
        res.json({message: 'error', detail: req.session!.messages});
    }

    public logout(req: Request, res: Response) {
        req.logout();
        return res.json({message: "success", detail: "success logout"})
    }

    public failLogin(req: Request, res: Response) {
        return res.json({message: "error", detail: req.session!.messages})
    }

    public profile(req: Request, res: Response) {
        return res.json({message: "success", detail: "login", user: req.session!.passport.user})
    }
}