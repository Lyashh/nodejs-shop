import chai from 'chai';

import Joi from '../../services/validation/joi';

chai.should();
const expect = chai.expect;

describe('Validation', () => {
	describe('Registration', () => {
		it('it correct validate user object', async () => {
			const email = 'email@gmail.com';
			const validation = await Joi.userValidation({ email, password: '123456qw', name: 'name' });
			expect(validation).to.have.property('value');
			expect(validation.value).to.have.property('email');
			expect(validation.value).to.have.property('password');
			expect(email).to.equal(validation.value.email);
		});

		it('it should send validation error', async () => {
			const validation = await Joi.userValidation({ password: '123', name: 'name' });
			expect(validation).to.have.property('error');
		});
	})

	describe('Login User', () => {
		it('it should validate login data', async () => {
			const email = 'email@gmail.com';
			const validation = await Joi.loginValidation({ email, password: '123456qw' });
			expect(validation).to.have.property('value');
			expect(validation.value).to.have.property('email');
			expect(validation.value).to.have.property('password');
			expect(email).to.equal(validation.value.email);
		});

		it('it should send validation error of login data', async () => {
			const validation1 = Joi.loginValidation({ password: '123', name: 'name' });
			const validation = await Joi.loginValidation({ password: '123', name: 'name' });
			expect(validation).to.have.property('error');
		});
	})
});
