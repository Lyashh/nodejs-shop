import { Router as ExpressRouter } from 'express';
import CartController from '../controllers/cart.controller';
import ValidationMiddleware from '../middleware/validation.middleware';

export default class RootRouter {
	private router: ExpressRouter
	private cartController: CartController
	private validationMiddleware: ValidationMiddleware;
	constructor() {
		this.router = ExpressRouter();
		this.cartController = new CartController();
		this.validationMiddleware = new ValidationMiddleware();
	}

	public get routes(): ExpressRouter {
		this.router.post('/', this.validationMiddleware.cartValidation(), this.cartController.addOrUpdate());
		return this.router;
	}
}
