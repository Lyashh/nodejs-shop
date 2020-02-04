import { Router as ExpressRouter } from 'express'
import { RootController } from '../controllers/'

export default class RootRouter {
    private static _router: ExpressRouter = ExpressRouter();

    public static get routes() {
        this._router.get('/', RootController.index)
        return this._router
    }
}