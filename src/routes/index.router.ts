import { Router as ExpressRouter } from 'express';
import RootRouter from './root.router';
import UserRouter from './users.router';
import AuthRouter from './auth.router';
import ProductRouter from './product.router';
import CartRouter from './cart.router';

export default class Router {
	private router: ExpressRouter
	private userRouter: UserRouter
	private rootRouter: RootRouter
	private authRouter: AuthRouter
	private productRouter: ProductRouter
	private cartRouter: CartRouter

	constructor() {
		this.router = ExpressRouter();
		this.userRouter = new UserRouter();
		this.rootRouter = new RootRouter();
		this.authRouter = new AuthRouter();
		this.productRouter = new ProductRouter();
		this.cartRouter = new CartRouter();
	}

	public get routes() {
		this.router.use('/', this.rootRouter.routes);
		this.router.use('/users', this.userRouter.routes);
		this.router.use('/auth', this.authRouter.routes);
		this.router.use('/products', this.productRouter.routes);
		this.router.use('/cart', this.cartRouter.routes);
		return this.router;
	}
}
