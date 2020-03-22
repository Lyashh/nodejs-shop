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
}
