import { Response, Request, NextFunction } from 'express';

export default class AuthMiddleware {
	public isAuth(req: Request, res: Response, next: NextFunction): void | Response {
		if (req.isAuthenticated()) {
			return next();
		} else {
			return res.status(401).json({
				message: 'Unauthorized',
				detail: 'The request has not been applied because it lacks valid authentication credentials for the target resource',
			});
		}
	}

	public notAuth(req: Request, res: Response, next: NextFunction): void | Response {
		if (!req.isAuthenticated()) {
			return next();
		} else {
			return res.status(401).json({
				message: 'Forbidden',
				detail: 'You cant access to this request because you Authorized now. please try logout',
			});
		}
	}

	public setSessionItems() {
		return (req: Request, res: Response, next: NextFunction) => {
			if(!req.session!.orders || !req.session!.cart) {
				req.session!.orders = [];
				req.session!.cart = [];
				return next()
			}
			return next()
		}
	}

	sessionToDb() {
		return async (req: Request, res: Response, next: NextFunction) => {
			if(req.session!.cart.length > 0) {
				console.log('add items to cart');
				req.session!.cart = [];
			}
			if(req.session!.orders.length > 0) {
				console.log('add items to order');
				req.session!.orders = [];
			}
			next()
		}
	}
}
