import { Response, Request } from 'express';
import ProductService from '../services/db/product.service';

export default class ProductControoller {
	public productController: ProductService
	constructor() {
		this.productController = new ProductService();
	}

	public getAll() {
		return (req: Request, res: Response): Promise<Response> => {
			return this.productController.findAll().then((products) => {
				return res.json({ data: products });
			}).catch((err) => res.json({ err }));
		}
	}

	public getById() {
		return (req: Request, res: Response): Promise<any> => {
			return this.productController.findById(parseInt(req.params.id)).then((product) => {
				if (product) {
					return res.json({ data: product });
				}
				return res.status(404).json({ message: `Product with id: '${req.params.id}' does not exist` });
			}).catch((err) => res.json({ err }));
		}
	}
}
