import { Router as ExpressRouter } from 'express'
import UserController from '../controllers/user.controller'

export default class UsersRouter {
    private static _router: ExpressRouter = ExpressRouter();

    public static get routes() {
        this._router.post('/', UserController.createOne)
        return this._router
    }
}