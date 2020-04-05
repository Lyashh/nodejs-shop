import MainDatabaseService from './mainDatbase.service';

export default class CartService extends MainDatabaseService {
	constructor() {
		super()
	}

	public findAll() {
		return this.getAll('cart', ['*']);
	}

	public addOneByAuth(item: { user_id: number; product_id: number }) {
		return this.knex('cart').insert(item)
			.then((res) => res)
			.catch((err) => err);
	}
}