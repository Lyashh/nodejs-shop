import { Response, Request } from 'express';
import CartService from '../services/db/cart.service';

export default class OrderController {
    public cartService: CartService

    constructor() {
        this.cartService = new CartService();
    }

    public addNotAuth(): Function {
        return async (req: Request, res: Response): Promise<Response> => {
            /* get quantity from session cart */
            const items = req.session!.cart.filter((sessionEl: { product_id: number, quantity: number }) => {
                return req.body.order.items.some((bodyEl: { product_id: number }) => {
                    return sessionEl.product_id == bodyEl.product_id
                })
            });
            /* get current date */
            const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
            
            return this.cartService.sumOfProducts(items).then(sum => {
                const newOrder: {
                    sum: number;
                    items: Array<{ product_id: number, quantity: number }>
                    phone: string;
                    delivery_id: number;
                    payment_id: number;
                    created_at: string;
                    updated_at: string;
                } = {
                    sum,
                    items,
                    phone: req.body.order.phone,
                    delivery_id: req.body.order.delivery_id,
                    payment_id: req.body.order.payment_id,
                    created_at: currentDate,
                    updated_at: currentDate
                }
                return res.json(...req.session!.orders, newOrder)
            }).catch(err => {
                return res.status(500).json(err)
            })
        }
    }
}
