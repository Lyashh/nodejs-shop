import chai from 'chai';
import UserService from '../../services/db/user.service';

const expect = chai.expect;

describe('User Service Test', () => {
	const userService = new UserService()
	it('Check creating class', () => {;
		expect(userService).to.be.ok;
	});

	it('Check Methods', async () => {;
		expect(await userService.findAll()).to.be.a('array');
	});
});




