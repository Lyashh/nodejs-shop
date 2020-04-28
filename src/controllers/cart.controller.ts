import { Response, Request } from 'express';
import CartService from '../services/db/cart.service';
import ProductService from '../services/db/product.service';

import { CartRequest } from '../middleware/validation.middleware'

export default class CartController {
	public cartService: CartService
	public productService: ProductService

	constructor() {
		this.productService = new ProductService();
		this.cartService = new CartService();
	}

	public addOrUpdateAuth() {
		return async (req: CartRequest, res: Response) => {
			const item: { product_id: number; quantity: number; user_id: number } = {
				product_id: req.cart.item.product_id,
				quantity: req.cart.item.quantity,
				user_id: req.session!.passport.user.id,
			};
			return this.cartService.addOrUpdateByAuth(item).then((data) => {
				return res.json({ data });
			}).catch((err) => res.json({ err }));
		}
	}

	public addOrUpdateNotAuth() {
		return (req: CartRequest, res: Response): Promise<Response> | Response => {
			return this.productService.findById(req.body.item.product_id).then(product => {
				/* check if product with id exists*/
				if (product) {
					/* found this id in session */
					const found = req.session!.cart.some(el => el.product_id === req.body.item.product_id);
					/*if found -> update */
					if (found) {
						req.session!.cart = req.session!.cart.map((el: { product_id: number; quantity: number }) => {
							if (el.product_id == req.body.item.product_id) {
								el.quantity += req.body.item.quantity
							}
							return el
						})
					} else {
						/* if not found -> add to session */
						req.session!.cart = [...req.session!.cart, req.body.item]
					}
					return res.json(req.session!.cart)
				}
				return res.status(404).json({ detail: `Product with ${req.body.item.product_id} id does not exist` })
			}).catch(err => {
				return res.status(500).json({ err })
			})
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

	public addOrderNotAuth() {
		return (req: CartRequest, res: Response) => {
			return this.cartService.cartByUserId(parseInt(req.params.id))
				.then(data => {
					res.json(data)
				})
				.catch((err) => res.status(500).json({ err }));
		}
	}
}
