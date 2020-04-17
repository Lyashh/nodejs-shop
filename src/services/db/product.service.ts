import MainDatabaseService from './mainDatbase.service';

export default class ProductService extends MainDatabaseService {
	constructor() {
		super()
	}

	public findAll() {
		return this.getAll('products', ['*']);
	}

	public findById(id: number): Promise<any> {
		return this.knex
			.select('p.title', 'p.id', 'p.description', 'p.price', 'p.main_photo', 'cg.title AS category')
			.from('products AS p')
			.leftJoin('category AS cg', 'p.category_id', 'cg.id')
			.where('p.id', id)
			.first()
			.then((user) => user)
			.catch((err) => err);
	}

	public paginate(page: number, limit: number) {
		return this.paginateTable(page, limit, 'products', ['*']);
	}
}