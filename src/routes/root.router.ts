import { Router as ExpressRouter } from 'express'
import RootController  from '../controllers/root.controller'
import auth from '../services/auth/passport'
const passport = auth.getInstance

export default class RootRouter {
    public  _router: ExpressRouter
    public _rootController: RootController
    constructor() {
        this._rootController = new RootController()
        this._router = ExpressRouter();
    }
    public get routes() {
        this._router.get('/', passport._passport.authenticate( 'google', {
            successRedirect: '/auth/google/success',
            failureRedirect: '/auth/google/failure'
    }), this._rootController.index)
        return this._router
    }
}