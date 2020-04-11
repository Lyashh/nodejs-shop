import { Response, Request } from 'express';
import CartService from '../services/db/cart.service';
import { CartRequest } from '../middleware/validation.middleware'

export default class CartController {
	public cartService: CartService

	constructor() {
		this.cartService = new CartService();
	}

	public addOrUpdate() {
		return (req: CartRequest, res: Response): Promise<Response> | Response => {
			if (req.cart && req.session!.passport) {
				const item: {product_id: number; quantity: number; user_id: number} = {
					product_id: req.cart.item.product_id,
					quantity: req.cart.item.quantity,
					user_id: req.session!.passport.user.id,
				};
				return this.cartService.addOrUpdateAuth(item).then((data) => {
					return res.json({ data });
				}).catch((err) => res.json({ err }));
			}
			return res.json({ message: 'params error' })
		}
	}

}
