import chai from 'chai';
import chaiHttp from 'chai-http';
import doenv from 'dotenv';

chai.use(chaiHttp);
chai.should();
doenv.config();

describe('Root Route', () => {
	it('it should GET name and verion. Path: "/" ', (done) => {
		chai.request(`http://localhost:${process.env.PORT}`)
			.get('/')
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.should.have.property('name');
				done();
			});
	});
});
