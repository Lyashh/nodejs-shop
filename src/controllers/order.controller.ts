import { Response, Request } from "express";
import OrderService from "../services/db/order.service";

export default class OrderController {
  public orderService: OrderService;

  constructor() {
    this.orderService = new OrderService();
  }

  public addNotAuth() {
    return (req: Request, res: Response): Promise<Response> | void => {
      this.orderService
        .insertAfterCreateAddress(req.body.order, req.session!.cart)
        .then((order) => {
          res.json(order);
        })
        .catch((err) => {
          res.status(500).json({ detail: err });
        });
    };
  }
}
