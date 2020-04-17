import { Response, Request } from 'express';
import ProductService from '../services/db/product.service';

export default class ProductControoller {
	public productService: ProductService
	constructor() {
		this.productService = new ProductService();
	}

	public getAll() {
		return (req: Request, res: Response): Promise<Response> => {
			return this.productService.findAll().then((products) => {
				return res.json({ data: products });
			}).catch((err) => res.json({ err }));
		}
	}

	public pagination() {
		return (req: Request, res: Response): Promise<any> => {
			return this.productService.paginate(Number(req.params.page), Number(req.params.limit))
				.then(async (page) => {
					if (page.items) {
						return res.json({
							data: {
								users: page.items,
								maxPage: page.maxPage,
								currentPage: page.currentPage,
							},
						});
					}
					res.status(404).json({ message: `Page ${req.params.page} does not exist`, maxPage: page.maxPage });
				}).catch((err) => res.json(err));
		}
	}

	public getById() {
		return (req: Request, res: Response): Promise<any> => {
			return this.productService.findById(parseInt(req.params.id)).then((product) => {
				if (product) {
					return res.json({ data: product });
				}
				return res.status(404).json({ message: `Product with id: '${req.params.id}' does not exist` });
			}).catch((err) => res.json({ err }));
		}
	}
}
