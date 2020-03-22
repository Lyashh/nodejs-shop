import { Router as ExpressRouter } from 'express';
import ItemController from '../controllers/product.controller';

export default class RootRouter {
	private router: ExpressRouter
	private productController: ItemController

	constructor() {
		this.productController = new ItemController();
		this.router = ExpressRouter();
	}

	public get routes(): ExpressRouter {
		// this.router.get('/', this.rootController.index)
		return this.router;
	}
}
