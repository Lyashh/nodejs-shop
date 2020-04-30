import { Router as ExpressRouter } from "express";
import ProductController from "../controllers/product.controller";
import ValidationMiddleware from "../middleware/validation.middleware";

export default class RootRouter {
  private router: ExpressRouter;
  private productController: ProductController;
  private validationMiddleware: ValidationMiddleware;

  constructor() {
    this.validationMiddleware = new ValidationMiddleware();
    this.productController = new ProductController();
    this.router = ExpressRouter();
  }

  public get routes(): ExpressRouter {
    this.router.get("/", this.productController.getAll());
    this.router.get(
      "/:id",
      this.validationMiddleware.paramIsNumber(["id"]),
      this.productController.getById()
    );
    this.router.get("/:page/:limit", this.productController.pagination());

    return this.router;
  }
}
