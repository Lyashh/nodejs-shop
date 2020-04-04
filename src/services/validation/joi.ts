import joi from '@hapi/joi';

interface ValidationResult {
	value: { [key: string]: string | number };
	error: { [key: string]: string | number | object | Array<string | object> };
}

export default class Joi {
	public static userValidation(user): ValidationResult {
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

	public static loginValidation(user): ValidationResult {
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
}
