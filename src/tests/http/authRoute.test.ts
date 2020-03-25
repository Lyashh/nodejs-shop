import chai from 'chai';
import chaiHttp from 'chai-http';
import doenv from 'dotenv';
import UserService from '../../services/db/user.service';

chai.use(chaiHttp);
doenv.config();
const expect = chai.expect;
const userService = new UserService()

describe('Route "/auth"', async () => {
	before(async () => {
		await userService.seedTable()
	});

	it('POST: "/registration". it should res validation error', () => {
		chai.request(`http://localhost:${process.env.PORT}/`)
			.post('auth/registration')
			.end((err, res) => {
				expect(res.status).to.equal(422); 
				expect(res.body).to.have.property('error');
			});
	});

	it('POST: "/registration". should res creating new user', () => {
		chai.request(`http://localhost:${process.env.PORT}/`)
			.post('auth/registration')
			.set('content-type', 'application/json')
			.send({user: {
				email: "email123@gmail.com",
				password: "12345678qwe"
			}})
			.end((err, res) => {
				expect(res.status).to.equal(201); 
				expect(res.body).to.have.property('data');
				expect(res.body.data).to.have.property('user')
			});
	});

	it('POST: "/login". it should res validation error', () => {
		chai.request(`http://localhost:${process.env.PORT}/`)
			.post('auth/login')
			.end((err, res) => {
				expect(res.status).to.equal(422); 
				expect(res.body).to.have.property('error');
			});
	});

	it('POST: "/login". it should res user with this email not found', (done) => {
		chai.request(`http://localhost:${process.env.PORT}/`)
			.post('auth/login')
			.set('content-type', 'application/json')
			.send({
				email: 'wwsddsd@gmail.com',
				password: 'ssqqwqwwqqwss'
			})
			.end((err, res) => {
				console.log(res.body);
				expect(res.status).to.equal(404); 
				expect(res.body).to.have.property('error');
			});
	});
});
