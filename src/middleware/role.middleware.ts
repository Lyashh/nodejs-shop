import { Response, Request, NextFunction } from 'express';
import RoleService from '../services/db/role.service';

export default class RoleMiddleware {
	private roleService: RoleService

	constructor() {
		this.roleService = new RoleService();
	}

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

	public roleExist() {
		return async (req: Request, res: Response, next: NextFunction) => {
			const role = req.params.role.toString();
			const roles = await this.roleService.findAll();
			const exist = roles.some((el) => {
				if (el.title === role) {
					req.params.roleId = el.id;
				}
				return el.title === role;
			});
			if (exist) {
				return next();
			}
			return res.status(404).json({ message: `Role with title ${req.params.role} not exist` });
		}
	}
}
