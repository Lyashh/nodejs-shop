import { Router as ExpressRouter } from "express";
import OrderMiddleware from "../middleware/order.middlerare";
import AuthMiddleware from "../middleware/auth.middleware";
import OrderController from "../controllers/order.controller";
import ValidationModdleware from "../middleware/validation.middleware";

export default class RootRouter {
  private router: ExpressRouter;
  private orderMiddleware: OrderMiddleware;
  private orderController: OrderController;
  private authMiddleware: AuthMiddleware;
  private validationModdleware: ValidationModdleware;

  constructor() {
    this.router = ExpressRouter();
    this.orderMiddleware = new OrderMiddleware();
    this.orderController = new OrderController();
    this.authMiddleware = new AuthMiddleware();
    this.validationModdleware = new ValidationModdleware();
  }

  public get routes(): ExpressRouter {
    /* this.router.post('/addAuth', this.validationMiddleware.cartValidation(),
			this.authMiddleware.isAuth,
            this.cartController.addOrUpdateAuth()); */
    this.router.post(
      "/byEmail",
      this.authMiddleware.notAuth(),
      this.validationModdleware.validateEmail(),
      this.orderController.byEmailNotAuth()
    );

    this.router.post(
      "/addNotAuth",
      this.authMiddleware.notAuth(),
      this.orderMiddleware.vlidateOrderNotAuth(),
      this.orderMiddleware.checkItemsInCart(),
      this.orderController.addNotAuth()
    );
    return this.router;
  }
}
