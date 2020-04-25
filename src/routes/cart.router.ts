import { Router as ExpressRouter } from 'express';
import CartController from '../controllers/cart.controller';
import ValidationMiddleware from '../middleware/validation.middleware';
import AuthMiddleware from '../middleware/auth.middleware';

export default class RootRouter {
	private router: ExpressRouter
	private cartController: CartController
	private validationMiddleware: ValidationMiddleware;
	private authMiddleware: AuthMiddleware;

	constructor() {
		this.router = ExpressRouter();
		this.cartController = new CartController();
		this.validationMiddleware = new ValidationMiddleware();
		this.authMiddleware = new AuthMiddleware();
	}

	public get routes(): ExpressRouter {
		this.router.post('/addAuth', this.validationMiddleware.cartValidation(),
			this.authMiddleware.isAuth,
			this.cartController.addOrUpdateAuth());
		this.router.post('/addNotAuth', this.validationMiddleware.cartValidation(),
			this.authMiddleware.notAuth,
			this.cartController.addOrUpdateNotAuth());
		this.router.get('/byUser/:id', this.cartController.cartByUserId());
		return this.router;
	}
}
