import { Router as ExpressRouter } from 'express'
import AuthController from '../controllers/auth.controller'
import AuthMiddleware from '../middleware/auth.middleware'
import ValidationMiddleware from '../middleware/validation.middleware'
import auth from '../services/auth/passport'
const passport = auth.getInstance

export default class UsersRouter {
    public _router: ExpressRouter
    public _authController: AuthController
    public _authMiddleware: AuthMiddleware
    public _validationMiddleware: ValidationMiddleware
    constructor()  {
        this._validationMiddleware = new ValidationMiddleware
        this._authController = new AuthController()
        this._authMiddleware = new AuthMiddleware
        this._router = ExpressRouter()
    }
    public get routes() {
        this._router.get('/google', passport.googleAuth)
        this._router.get('/google/callback', passport.googleMiddleware, this._authController.googleCallback)

        this._router.post('/login', this._authMiddleware.notAuth,
                                    this._validationMiddleware.loginValidation, 
                                    passport.localMiddleware, 
                                    this._authController.profile)
        this._router.get('/login/callback', this._authController.failLogin)
        this._router.post('/registration',  this._validationMiddleware.registerUserValidation, 
                                            this._authController.registration)
        this._router.post('/logout', this._authMiddleware.isAuth, this._authController.logout)
        this._router.get('/profile', this._authMiddleware.isAuth, this._authController.profile)

        return this._router
    }
}