import chai from 'chai';
import chaiHttp from 'chai-http';
import doenv from 'dotenv';
import UserService from '../../src/services/db/user.service';

chai.use(chaiHttp);
doenv.config();
const expect = chai.expect;

describe('User Route', () => {
	before(async () => {
		await UserService.seedTable()
	});

	it('it should GET array of users. Path: "/users" ', (done) => {
		chai.request(`http://localhost:${process.env.PORT}/`)
			.get('users')
			.end((err, res) => {	
				res.should.have.status(200);
				expect(res.body).to.have.property('users');
				expect(res.body.users).to.be.a('array');
				expect(res.body.users).to.have.lengthOf.above(1);
				done();
			});
	});
});
