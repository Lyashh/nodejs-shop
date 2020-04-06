import { Response, Request } from 'express';
import CartService from '../services/db/cart.service';

export default class CartController {
	public cartService: CartService

	constructor() {
		this.cartService = new CartService();
	}

	public addOrUpdate() {
		return (req: Request, res: Response): Promise<Response> | Response => {
			if (req.body.item) {
				let item = req.body.item;
				return this.cartService.addOrUpdateAuth(item).then((data) => {
					return res.json({ data });
				}).catch((err) => res.json({ err }));
			}
			return res.json({ message: 'params error' })

		}
	}

}
