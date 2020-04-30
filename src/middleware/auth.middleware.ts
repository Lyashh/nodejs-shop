import { Response, Request, NextFunction } from "express";
import CartService from "../services/db/cart.service";
import log4js from "log4js";

const logger = log4js.getLogger();

export default class AuthMiddleware {
  public cartService: CartService;

  constructor() {
    this.cartService = new CartService();
  }

  public isAuth(
    req: Request,
    res: Response,
    next: NextFunction
  ): void | Response {
    if (req.isAuthenticated()) {
      return next();
    } else {
      return res.status(401).json({
        message: "Unauthorized",
        detail:
          "The request has not been applied because it lacks valid authentication credentials for the target resource",
      });
    }
  }

  public notAuth(
    req: Request,
    res: Response,
    next: NextFunction
  ): void | Response {
    if (!req.isAuthenticated()) {
      return next();
    } else {
      return res.status(401).json({
        message: "Forbidden",
        detail:
          "You cant access to this request because you Authorized now. please try logout",
      });
    }
  }

  public setSessionItems() {
    return (req: Request, res: Response, next: NextFunction) => {
      if (!req.session!.cart) {
        req.session!.cart = [];
        return next();
      }
      return next();
    };
  }

  sessionToDb() {
    return async (req: Request, res: Response, next: NextFunction) => {
      if (req.session!.cart.length > 0) {
        const result = await this.cartService.addArray(
          req.session!.cart.map((el) => {
            el.user_id = req.session!.passport.user.id;
            return el;
          })
        );
        const check = result.every((el) => {
          return el[0].id;
        });
        if (!check) {
          logger.error("Save cart from from session to DB error");
          logger.error({ carts: result });
        }
        req.session!.cart = [];
      }
      next();
    };
  }
}
