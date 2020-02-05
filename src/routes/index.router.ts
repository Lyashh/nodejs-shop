import { Router as ExpressRouter } from 'express'
import RootRouter from './root.router'
import UserRouter from './users.router'

export default class Router {
    private _router: ExpressRouter
    private _userRouter: UserRouter
    private _rootRouter: RootRouter
    constructor() {
        this._router = ExpressRouter();
        this._userRouter = new UserRouter()
        this._rootRouter = new RootRouter()
    }

    public get routes() {
        this._router.use('/', this._rootRouter.routes)
        this._router.use('/users', this._userRouter.routes)
        return this._router
    }
}