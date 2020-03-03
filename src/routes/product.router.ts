import { Router as ExpressRouter } from 'express'
import ItemController  from '../controllers/product.controller'


export default class RootRouter {
    public  _router: ExpressRouter
    public _productController: ItemController
    constructor() {
        this._productController = new ItemController()
        this._router = ExpressRouter();
    }
    public get routes() {
        //this._router.get('/', this._rootController.index)
        return this._router
    }
}