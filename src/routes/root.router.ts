import { Router as ExpressRouter } from 'express'
import RootController  from '../controllers/root.controller'

export default class RootRouter {
    private  _router: ExpressRouter
    private _rootController: RootController
    constructor() {
        this._rootController = new RootController()
        this._router = ExpressRouter();
    }
    public get routes() {
        this._router.get('/', this._rootController.index)
        return this._router
    }
}