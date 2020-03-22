import { Response, Request, NextFunction } from 'express';

export default class RoleMiddleware {
	public isAdmin(req: Request, res: Response, next: NextFunction): void | Response {
		if (req.isAuthenticated() && req.session!.passport.user.role_id === 2) {
			return next();
		} else {
			return res.status(401).json({
				message: 'Unauthorized',
				detail: 'Access denied. You dont have necessary rights',
			});
		}
	}
}
