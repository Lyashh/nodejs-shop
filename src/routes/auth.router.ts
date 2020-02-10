import { Router as ExpressRouter } from 'express'
import AuthController from '../controllers/auth.controller'
import auth from '../services/auth/passport'
const passport = auth.getInstance

export default class UsersRouter {
    public _router: ExpressRouter
    public _authController: AuthController
    constructor()  {
        this._authController = new AuthController()
        this._router = ExpressRouter()
    }
    public get routes() {
        this._router.get('/google', passport.googleAuth)
        this._router.get('/google/callback', passport.googleMiddleware, this._authController.googleCallback)
        return this._router
    }
}