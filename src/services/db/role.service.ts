import MainDatabaseService from './mainDatbase.service';

export default class RoleService extends MainDatabaseService {
	constructor() {
		super()
	}

	public findAll() {
		return this.getAll('roles', ['*']);
	}
}
