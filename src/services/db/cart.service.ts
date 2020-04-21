import MainDatabaseService from './mainDatbase.service';

export default class CartService extends MainDatabaseService {
	constructor() {
		super()
	}

	public findAll(): Promise<any> {
		return this.getAll('cart', ['*']);
	}

	public async addOrUpdateByAuth(item): Promise<any> {
		const cartQuery = this.knex('cart').select('*')
			.where('user_id', item.user_id).andWhere('product_id', item.product_id);
		return cartQuery.then((cart: Array<any>) => {
			if (cart.length > 0) {
				return cartQuery.update({ quantity: item.quantity + cart[0].quantity }).returning('*');
			} else {
				return this.knex('cart').insert(item).returning('*');
			}
		})
			.catch((err) => err);
	}
}