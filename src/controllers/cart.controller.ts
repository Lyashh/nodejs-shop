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
			if (req.session!.passport) {
				const item: {product_id: number; quantity: number; user_id: number} = {
					product_id: req.body.item.product_id,
					quantity: req.body.item.quantity,
					user_id: req.session!.passport.user.id,
				};
				return this.cartService.addOrUpdateByAuth(item).then((data) => {
					return res.json(data);
				}).catch((err) => res.json({ err }));
			}	else {
				return res.json({ message: 'guest service' })
			}
		}
	}

	public cartByUserId() {
		return (req: CartRequest, res: Response) => {
			return this.cartService.cartByUserId(parseInt(req.params.id))
				.then(data => {
					res.json(data)
				})
				.catch((err) => res.status(500).json({ err }));
		}
	}

}
