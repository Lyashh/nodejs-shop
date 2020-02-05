import { Router as ExpressRouter } from 'express'
import UserController from '../controllers/user.controller'

export default class UsersRouter {
    private _router: ExpressRouter
    private _userController: UserController
    constructor()  {
        this._userController = new UserController()
        this._router = ExpressRouter()
    }
    public get routes() {
        this._router.post('/', this._userController.createOne)
        return this._router
    }
}