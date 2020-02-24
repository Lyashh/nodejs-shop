import { Router as ExpressRouter } from 'express'
import UserController from '../controllers/user.controller'

export default class UsersRouter {
    public _router: ExpressRouter
    public _userController: UserController
    constructor()  {
        this._userController = new UserController()
        this._router = ExpressRouter()
    }
    public get routes() {
        return this._router
    }
}