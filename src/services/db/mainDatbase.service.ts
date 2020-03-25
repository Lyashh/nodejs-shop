import DB from '../../database/connection'
import Knex from 'knex';

export default abstract class MainDatabaseService {
	private connection: Knex
	constructor() {
		this.connection = DB.getInstance.getConnection
	}

	public get knex() {
		return this.connection
	}
}