import { Response, Request } from "express";
import OrderService, { OrdersAndItems } from "../services/db/order.service";

export default class OrderController {
  public orderService: OrderService;

  constructor() {
    this.orderService = new OrderService();
  }

  /**
   *
   *
   * @returns
   * @memberof OrderController
   */
  public addNotAuth() {
    return (req: Request, res: Response): Promise<Response> | void => {
      this.orderService
        .insertAfterCreateAddress(req.body.order, req.session!.cart)
        .then((orderInfo: OrdersAndItems) => {
          if (orderInfo.items.length > 0) {
            // AFTER SUCCESS ADDING TO ORDER DELETE ITEMS FROM SESSION
            req.session!.cart = req.session!.cart.filter(
              (sessionEl: { product_id: number; quantity: number }) => {
                const found = orderInfo.items.some((orderEl) => {
                  return (
                    parseInt(orderEl.product_id) ===
                    parseInt(sessionEl.product_id)
                  );
                });
                return !found;
              }
            );
          } else {
            res.status(500).json({ detail: orderInfo });
          }
          res.json(orderInfo);
        })
        .catch((err) => {
          res.status(500).json({ detail: err });
        });
    };
  }

  public byEmailNotAuth() {
    return (req: Request, res: Response): Promise<Response> | void => {
      return this.orderService
        .getByEmail(req.body.email)
        .then((orders) => {
          res.json({ orders });
        })
        .catch((err) => err);
    };
  }
}
