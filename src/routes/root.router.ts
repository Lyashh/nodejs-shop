import { Router as ExpressRouter } from 'express';
import RootController from '../controllers/root.controller';


export default class RootRouter {
	public router: ExpressRouter
	public rootController: RootController

	constructor() {
		this.rootController = new RootController();
		this.router = ExpressRouter();
	}

	public get routes() {
		this.router.get('/', this.rootController.index);
		return this.router;
	}
}
