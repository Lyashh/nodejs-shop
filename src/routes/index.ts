import { Router as ExpressRouter } from 'express'
import RootRouter from './root'
import UserRouter from './users'

export default class Router {
    private static _router: ExpressRouter = ExpressRouter();

    public static get routes() {
        this._router.use('/', RootRouter.routes)
        this._router.use('/users', UserRouter.routes)
        return this._router
    }
}