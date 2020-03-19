import { Router as ExpressRouter } from 'express';
import UserController from '../controllers/user.controller';
import roleMiddleware from '../middleware/role.middleware';

export default class UsersRouter {
    public _router: ExpressRouter

    public _userController: UserController

    private _roleMiddleware: roleMiddleware

    constructor() {
      this._userController = new UserController();
      this._roleMiddleware = new roleMiddleware();
      this._router = ExpressRouter();
    }

    public get routes() {
      this._router.get('/', /* this._roleMiddleware.isAdmin, */ this._userController.getAll);
      this._router.get('/:page/:limit', /* this._roleMiddleware.isAdmin, */ this._userController.pagination);
      this._router.get('/:id', /* this._roleMiddleware.isAdmin, */ this._userController.getById);
      this._router.delete('/:id', /* this._roleMiddleware.isAdmin, */ this._userController.deleteUser);

      return this._router;
    }
}
