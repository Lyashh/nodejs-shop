import { Response, Request, NextFunction } from 'express'

export default class AuthMiddleware {
    public isAuth(req: Request, res: Response, next: NextFunction) {
        if(req.isAuthenticated()) {
            next()
        } else {
            return res.status(401).json({message: "Unauthorized", 
                detail: "The request has not been applied because it lacks valid authentication credentials for the target resource"})
        }
    }
}