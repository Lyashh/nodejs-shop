import chai from 'chai';
import fetch from "node-fetch"
import chaiHttp from 'chai-http';
import doenv from 'dotenv';
import UserService from '../../services/db/user.service';

chai.use(chaiHttp);
doenv.config();
const expect = chai.expect;
const userService = new UserService()

describe('Route "/users"', async () => {
	it('GET: "/users". it should res array of users.', () => {
		chai.request(`http://localhost:${process.env.PORT}/`)
			.get('users')
			.end((err, res) => {
				res.should.have.status(200);
				expect(res.body).to.have.property('users');
				expect(res.body.users).to.be.a('array');
				expect(res.body.users).to.have.lengthOf.above(1);
			});
	});

	it('GET: "/users/:id" id=4. it should res user obj.', () => {
		chai.request(`http://localhost:${process.env.PORT}/`)
			.get("users/4")
			.end((err, res) => {
				res.should.have.status(200);
				expect(res.body.user).to.be.a('object');
				expect(res.body.user).to.have.property('id');
			});
	});

	it('GET: "/users/:id" id="string". it should res error: wrong property id.', () => {
		chai.request(`http://localhost:${process.env.PORT}/`)
			.get("users/string")
			.end((err, res) => {
				res.should.have.status(422);
				expect(res.body).to.have.property('error');
			});
	});


});
