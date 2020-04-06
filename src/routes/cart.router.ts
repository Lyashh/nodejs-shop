import { Router as ExpressRouter } from 'express';
import CartController from '../controllers/cart.controller'

export default class RootRouter {
	private router: ExpressRouter
	private cartController: CartController

	constructor() {
		this.router = ExpressRouter();
		this.cartController = new CartController()
	}

	public get routes(): ExpressRouter {
		this.router.post('/', this.cartController.addOrUpdate());
		return this.router;
	}
}
