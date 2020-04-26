import joi from '@hapi/joi';

interface UserValidationResult {
	value: { [key: string]: string | number };
	error: { [key: string]: string | number | object | Array<string | object> };
}

interface CartValidationResult {
	value: { [key: string]: number };
	error: { [key: string]: string | number | object | Array<string | object> };
}

export default class Joi {
	public static userValidation(user): UserValidationResult {
		const schema = joi.object({
			name: joi.string()
				.alphanum()
				.min(1)
				.max(40),
			email: joi.string()
				.email()
				.min(8)
				.max(30)
				.required(),
			password: joi.string()
				.alphanum()
				.min(8)
				.max(30)
				.required(),
		});
		return schema.validate(user);
	}

	public static loginValidation(user): UserValidationResult {
		const schema = joi.object({
			email: joi.string()
				.email()
				.min(8)
				.max(30)
				.required(),
			password: joi.string()
				.alphanum()
				.min(8)
				.max(30)
				.required(),
		});
		return schema.validate(user);
	}

	public static cartValidation(item): CartValidationResult {
		const schema = joi.object({
			product_id: joi.number()
				.integer()
				.min(1)
				.required(),
			quantity: joi.number()
				.integer()
				.min(1)
				.required(),
		});
		return schema.validate(item);
	}

	public static orderValidation(item) {
		const services = joi.object({
			product_id: joi.number()
				.integer()
				.required()
		});

		const schema = joi.array().items(services).min(1)
		return schema.validate(item);
	}
}
