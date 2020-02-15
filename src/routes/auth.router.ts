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
        this._router.post('/registration', this._authController.userValidation, this._authController.registration)
        this._router.get('/logout', this._authController.isAuthMiddleware, this._authController.logout)
        return this._router
    }
}