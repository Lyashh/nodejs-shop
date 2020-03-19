import { Router as ExpressRouter } from 'express';
import RootRouter from './root.router';
import UserRouter from './users.router';
import AuthRouter from './auth.router';
import ProductRouter from './product.router';

export default class Router {
    private _router: ExpressRouter

    private _userRouter: UserRouter

    private _rootRouter: RootRouter

    private _authRouter: AuthRouter

    private _productRouter: ProductRouter

    constructor() {
      this._router = ExpressRouter();
      this._userRouter = new UserRouter();
      this._rootRouter = new RootRouter();
      this._authRouter = new AuthRouter();
      this._productRouter = new ProductRouter();
    }

    public get routes() {
      this._router.use('/', this._rootRouter.routes);
      this._router.use('/users', this._userRouter.routes);
      this._router.use('/auth', this._authRouter.routes);
      this._router.use('/products', this._productRouter.routes);
      return this._router;
    }
}
