import { Response, Request, NextFunction } from 'express';
import Validation from '../services/validation/joi';

export default class RoleMiddleware {

    public vlidateOrderNotAuth() {
        return async (req: Request, res: Response, next: NextFunction) => {
            if (req.body.order) {
                const validResult = await Validation.orderValidationNotAuth(req.body.order);
                if (validResult.error) {
                    return res.status(422).json({
                        detail: validResult.error.details[0],
                        message: 'validation fails',
                    });
                }
                return next();
            } else {
                return res.status(422).json({ detail: 'Request dont have field "order"', message: 'validation fails' });
            }
        }
    }

    public checkItemsInCart() {
        return (req: Request, res: Response, next: NextFunction) => {
            const errItems: Array<{ product_id: number }> = [];
            const valid = req.body.order.items.every((orderCart: { product_id: number }) => {
                const check = req.session!.cart.some((sessionCart: { product_id: number; quantity: number }) => {
                    return orderCart.product_id == sessionCart.product_id;
                })
                if (!check) {
                    errItems.push(orderCart)
                }
                return check
            })
            if (valid) {
                return next();
            }
            return res.status(422).json({message: 'Cart doest have carts of your "order"', detail: {errItems}});
        }
    }
}
