import { Router as ExpressRouter } from 'express';
import UserController from '../controllers/user.controller';
import RoleMiddleware from '../middleware/role.middleware';
import ValidationMiddleware from '../middleware/validation.middleware'

export default class UsersRouter {
	public router: ExpressRouter
	public userController: UserController
	private roleMiddleware: RoleMiddleware
	private validationMiddleware: ValidationMiddleware;

	constructor() {
		this.validationMiddleware = new ValidationMiddleware();
		this.userController = new UserController();
		this.roleMiddleware = new RoleMiddleware();
		this.router = ExpressRouter();
	}

	public get routes() {
		this.router.get('/', /* this.roleMiddleware.isAdmin, */ this.userController.getAll());
		this.router.get('/:page/:limit', /* this.roleMiddleware.isAdmin, */ this.userController.pagination());
		this.router.get('/:id', this.validationMiddleware.paramIsNumber(['id']), this.userController.getById());
		this.router.delete('/:id', /* this.roleMiddleware.isAdmin, */ this.userController.deleteUser());

		return this.router;
	}
}
