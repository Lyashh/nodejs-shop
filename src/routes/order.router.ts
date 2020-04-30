import { Router as ExpressRouter } from "express";
import OrderMiddleware from "../middleware/order.middlerare";
import OrderController from "../controllers/order.controller";

export default class RootRouter {
  private router: ExpressRouter;
  private orderMiddleware: OrderMiddleware;
  private orderController: OrderController;

  constructor() {
    this.router = ExpressRouter();
    this.orderMiddleware = new OrderMiddleware();
    this.orderController = new OrderController();
  }

  public get routes(): ExpressRouter {
    /* this.router.post('/addAuth', this.validationMiddleware.cartValidation(),
			this.authMiddleware.isAuth,
			this.cartController.addOrUpdateAuth()); */
    this.router.post(
      "/addNotAuth",
      this.orderMiddleware.vlidateOrderNotAuth(),
      this.orderMiddleware.checkItemsInCart(),
      this.orderController.addNotAuth()
    );
    return this.router;
  }
}
