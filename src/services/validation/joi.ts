import joi from '@hapi/joi'

export default class Joi {
    public static async userValidation(user) {
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
                .required()
        })
        return await schema.validate(user)
    }

    public static async loginValidation(user) {
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
                .required()
        })
        return await schema.validate(user)
    }
}

